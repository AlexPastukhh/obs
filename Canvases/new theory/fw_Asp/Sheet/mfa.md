---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
some theo ^lyPP20UR

flow ^IYaxWGSD

using System.Security.Cryptography;
using OtpNet;

public static class TotpSecret
{
    // 20 bytes = 160 bits (common standard; plenty for TOTP)
    public static string CreateBase32Secret(int byteLength = 20)
    {
        byte[] secretBytes = RandomNumberGenerator.GetBytes(byteLength);
        return Base32Encoding.ToString(secretBytes); // Base32 text for QR/manual entry
    }
} ^5MUJYWU0

using System.Security.Cryptography;
using System.Text;

public static class TotpSecretCourseStyle
{
    // Base32 alphabet (classic): A-Z and 2-7
    private static readonly char[] Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".ToCharArray();

    public static string CreateSecret(int length = 16)
    {
        // Generate plenty of random bytes so every character pick is random
        byte[] random = RandomNumberGenerator.GetBytes(length * 4);

        var sb = new StringBuilder(length);

        for (int i = 0; i < length; i++)
        {
            // Read 4 bytes as an unsigned int (0..2^32-1)
            uint val = BitConverter.ToUInt32(random, i * 4);

            // Convert to an index inside Alphabet
            sb.Append(Alphabet[val % (uint)Alphabet.Length]);
        }

        return sb.ToString();
    }
} ^89QCi85A

using System.Security.Cryptography;
using OtpNet;

public static class TotpSecretBytes
{
    public static byte[] CreateSecretBytes(int byteLength = 20)
        => RandomNumberGenerator.GetBytes(byteLength);

    public static string ToBase32(byte[] secretBytes)
        => Base32Encoding.ToString(secretBytes);
} ^n2wnkGut

protecting secret
and store to db
then unprotect 
to verify token using
library ^fBNleRrn

adding -1 +1 step ^aLFMKcQb

here we are scanning or entering base32 code
then app generates token
and we enter it  ^c3BGG5Ca

entropy, bitconverter unsigned int ^9CsdZecy

using System.Net;

public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
{
    var i = WebUtility.UrlEncode(issuer);
    var a = WebUtility.UrlEncode(account);

    return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
} ^oMaqQKkG

!!! ^50bZji79

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OtpNet;

[Authorize]
public class MfaController : Controller
{
    private readonly AppDbContext _db;
    private readonly IUserContext _userContext;
    private readonly IDataProtector _protector;

    public MfaController(AppDbContext db, IUserContext userContext, IDataProtectionProvider dp)
    {
        _db = db;
        _userContext = userContext;
        _protector = dp.CreateProtector("mfa-secret-v1");
    }

    [HttpGet]
    public async Task<IActionResult> Enroll()
    {
        var user = _userContext.GetCurrentUser(); // needs Id, Email/Username
        var issuer = "MyApp";

        // 1) Create secret (your method)
        var secret = CreateSecret();

        // 2) Store pending secret in DB (upsert, single per user)
        var now = DateTime.UtcNow;
        var pending = await _db.PendingMfaEnrollments.SingleOrDefaultAsync(x => x.UserId == user.Id);

        if (pending == null)
        {
            pending = new PendingMfaEnrollment
            {
                UserId = user.Id,
                ProtectedSecret = _protector.Protect(secret),
                CreatedUtc = now,
                ExpiresUtc = now.AddMinutes(10)
            };
            _db.PendingMfaEnrollments.Add(pending);
        }
        else
        {
            pending.ProtectedSecret = _protector.Protect(secret);
            pending.CreatedUtc = now;
            pending.ExpiresUtc = now.AddMinutes(10);
            pending.ConcurrencyStamp = Guid.NewGuid().ToString();
        }

        await _db.SaveChangesAsync();

        // 3) Build otpauth uri (your method)
        var uri = BuildOtpAuthUri(issuer, user.Email, secret);

        // 4) Return view model (manual key shown, but not posted back)
        var vm = new MfaEnrollGetVm
        {
            Issuer = issuer,
            AccountName = user.Email,
            QrCodeUri = uri,
            ManualKey = secret
        };

        return View(vm);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Enroll(MfaEnrollPostVm vm)
    {
        var user = _userContext.GetCurrentUser();
        var now = DateTime.UtcNow;

        var pending = await _db.PendingMfaEnrollments.SingleOrDefaultAsync(x => x.UserId == user.Id);
        if (pending == null || pending.ExpiresUtc <= now)
        {
            ModelState.AddModelError("", "Enrollment expired. Refresh the page and try again.");
            return View("Enroll", await RebuildEnrollGetVm(user)); // helper below
        }

        var secret = _protector.Unprotect(pending.ProtectedSecret);

        // verify code
        var totp = new Totp(Base32Encoding.ToBytes(secret));
        var ok = totp.VerifyTotp(vm.Code?.Trim() ?? "", out _, new VerificationWindow(previous: 1, future: 1));

        if (!ok)
        {
            ModelState.AddModelError(nameof(vm.Code), "Invalid code.");
            return View("Enroll", await RebuildEnrollGetVm(user));
        }

        // Save active secret (device)
        _db.UserSecrets.Add(new UserSecret
        {
            UserId = user.Id,
            Name = string.IsNullOrWhiteSpace(vm.DeviceName) ? "Authenticator" : vm.DeviceName.Trim(),
            ProtectedSecret = _protector.Protect(secret),
            IsActive = true
        });

        // Remove pending enrollment
        _db.PendingMfaEnrollments.Remove(pending);

        await _db.SaveChangesAsync();

        return RedirectToAction(nameof(EnrollSuccess));
    }

    [HttpGet]
    public IActionResult EnrollSuccess() => View();

    // Rebuild the GET VM so the page can re-render after POST errors
    // (we generate a fresh secret + overwrite pending)
    private async Task<MfaEnrollGetVm> RebuildEnrollGetVm(CurrentUser user)
    {
        var issuer = "MyApp";
        var secret = CreateSecret();

        var now = DateTime.UtcNow;
        var pending = await _db.PendingMfaEnrollments.SingleOrDefaultAsync(x => x.UserId == user.Id);
        if (pending == null)
        {
            pending = new PendingMfaEnrollment
            {
                UserId = user.Id,
                ProtectedSecret = _protector.Protect(secret),
                CreatedUtc = now,
                ExpiresUtc = now.AddMinutes(10)
            };
            _db.PendingMfaEnrollments.Add(pending);
        }
        else
        {
            pending.ProtectedSecret = _protector.Protect(secret);
            pending.CreatedUtc = now;
            pending.ExpiresUtc = now.AddMinutes(10);
            pending.ConcurrencyStamp = Guid.NewGuid().ToString();
        }

        await _db.SaveChangesAsync();

        return new MfaEnrollGetVm
        {
            Issuer = issuer,
            AccountName = user.Email,
            QrCodeUri = BuildOtpAuthUri(issuer, user.Email, secret),
            ManualKey = secret
        };
    }

    // placeholders to emphasize you already have them
    private string CreateSecret() => throw new NotImplementedException();
    private string BuildOtpAuthUri(string issuer, string account, string secret) => throw new NotImplementedException();
} ^42zuqda9

controller ^co8Ymu7Y

@model MfaEnrollGetVm
@{
    ViewData["Title"] = "Enable MFA";
}

<h2>Enable MFA</h2>

<p>Scan the QR code with your authenticator app, then enter the 6-digit code.</p>

<div style="display:flex; gap:24px; flex-wrap:wrap; align-items:flex-start;">
    <div>
        <div id="qrCode" style="padding:12px; border:1px solid #ccc; display:inline-block;"></div>
        <input type="hidden" id="qrCodeUri" value="@Model.QrCodeUri" />
    </div>

    <div style="max-width:520px;">
        <h4>Manual key</h4>
        <p>If you can’t scan, type this key into the authenticator app:</p>
        <pre style="padding:12px; background:#f5f5f5; border:1px solid #ddd;">@Model.ManualKey</pre>

        <div><strong>Issuer:</strong> @Model.Issuer</div>
        <div><strong>Account:</strong> @Model.AccountName</div>
    </div>
</div>

<hr />

<form asp-action="Enroll" method="post">
    @Html.AntiForgeryToken()

    <div>
        <label>Device name</label><br />
        <input name="DeviceName" value="My phone" style="width:320px;" />
    </div>

    <div style="margin-top:12px;">
        <label>6-digit code</label><br />
        <input name="Code" inputmode="numeric" autocomplete="one-time-code"
               style="width:180px; font-size:18px; letter-spacing:2px;" />
        <span style="color:#b00020;">@Html.ValidationMessage("Code")</span>
    </div>

    <div style="margin-top:16px;">
        <button type="submit">Verify & Enable</button>
    </div>

    <div asp-validation-summary="ModelOnly" style="color:#b00020; margin-top:12px;"></div>
</form>

@section Scripts {
    <script src="~/js/qrcode.min.js"></script>
    <script>
        (function () {
            const uri = document.getElementById("qrCodeUri").value;
            const el = document.getElementById("qrCode");
            el.innerHTML = "";
            new QRCode(el, { text: uri, width: 160, height: 160 });
        })();
    </script>
    <partial name="_ValidationScriptsPartial" />
} ^S0vQFfp3

razor ^hwG02Edr

@{
    ViewData["Title"] = "MFA Enabled";
}

<h2>MFA Enabled</h2>
<p>Your authenticator device is now linked.</p>
<a asp-controller="Home" asp-action="Index">Continue</a> ^mAight1s

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OtpNet;

[Authorize]
[ApiController]
[Route("api/mfa")]
public class MfaApiController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IUserContext _userContext;
    private readonly IDataProtector _protector;

    public MfaApiController(AppDbContext db, IUserContext userContext, IDataProtectionProvider dp)
    {
        _db = db;
        _userContext = userContext;
        _protector = dp.CreateProtector("mfa-secret-v1");
    }

    [HttpGet("enroll")]
    public async Task<IActionResult> GetEnroll()
    {
        var user = _userContext.GetCurrentUser();
        var issuer = "MyApp";

        var secret = CreateSecret();
        var now = DateTime.UtcNow;

        var pending = await _db.PendingMfaEnrollments.SingleOrDefaultAsync(x => x.UserId == user.Id);
        if (pending == null)
        {
            pending = new PendingMfaEnrollment
            {
                UserId = user.Id,
                ProtectedSecret = _protector.Protect(secret),
                CreatedUtc = now,
                ExpiresUtc = now.AddMinutes(10)
            };
            _db.PendingMfaEnrollments.Add(pending);
        }
        else
        {
            pending.ProtectedSecret = _protector.Protect(secret);
            pending.CreatedUtc = now;
            pending.ExpiresUtc = now.AddMinutes(10);
            pending.ConcurrencyStamp = Guid.NewGuid().ToString();
        }

        await _db.SaveChangesAsync();

        // Return qr + manual key (manual key optional in UI)
        return Ok(new
        {
            issuer,
            accountName = user.Email,
            qrCodeUri = BuildOtpAuthUri(issuer, user.Email, secret),
            manualKey = secret
        });
    }

    public sealed class CompleteEnrollRequest
    {
        public string DeviceName { get; set; } = "My phone";
        public string Code { get; set; } = default!;
    }

    [HttpPost("enroll")]
    public async Task<IActionResult> CompleteEnroll([FromBody] CompleteEnrollRequest req)
    {
        var user = _userContext.GetCurrentUser();
        var now = DateTime.UtcNow;

        var pending = await _db.PendingMfaEnrollments.SingleOrDefaultAsync(x => x.UserId == user.Id);
        if (pending == null || pending.ExpiresUtc <= now)
            return BadRequest(new { message = "Enrollment expired. Refresh and try again." });

        var secret = _protector.Unprotect(pending.ProtectedSecret);

        var totp = new Totp(Base32Encoding.ToBytes(secret));
        var ok = totp.VerifyTotp(req.Code?.Trim() ?? "", out _, new VerificationWindow(previous: 1, future: 1));
        if (!ok) return BadRequest(new { message = "Invalid code." });

        _db.UserSecrets.Add(new UserSecret
        {
            UserId = user.Id,
            Name = string.IsNullOrWhiteSpace(req.DeviceName) ? "Authenticator" : req.DeviceName.Trim(),
            ProtectedSecret = _protector.Protect(secret),
            IsActive = true
        });

        _db.PendingMfaEnrollments.Remove(pending);
        await _db.SaveChangesAsync();

        return Ok(new { success = true });
    }

    private string CreateSecret() => throw new NotImplementedException();
    private string BuildOtpAuthUri(string issuer, string account, string secret) => throw new NotImplementedException();
} ^wAwqyIf4

import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

type EnrollData = {
  issuer: string;
  accountName: string;
  qrCodeUri: string;
  manualKey?: string;
};

export function MfaEnroll() {
  const [data, setData] = useState<EnrollData | null>(null);
  const [deviceName, setDeviceName] = useState("My phone");
  const [code, setCode] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      setErr(null);
      const res = await fetch("/api/mfa/enroll", { credentials: "include" });
      if (!res.ok) {
        setErr("Failed to load enrollment data.");
        return;
      }
      setData(await res.json());
    })();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    const res = await fetch("/api/mfa/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ deviceName, code: code.trim() }),
    });

    if (!res.ok) {
      const j = await res.json().catch(() => null);
      setErr(j?.message ?? "Invalid code.");
      return;
    }

    setDone(true);
  }

  if (done) return <div><h2>MFA Enabled</h2><p>Device linked successfully.</p></div>;

  return (
    <div style={{ maxWidth: 720 }}>
      <h2>Enable MFA</h2>
      {err && <div style={{ color: "#b00020", marginBottom: 12 }}>{err}</div>}

      {!data ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Scan the QR code with your authenticator app.</p>

          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ padding: 12, border: "1px solid #ccc", display: "inline-block" }}>
              <QRCodeCanvas value={data.qrCodeUri} size={160} />
            </div>

            <div>
              <div><strong>Issuer:</strong> {data.issuer}</div>
              <div><strong>Account:</strong> {data.accountName}</div>

              {data.manualKey && (
                <>
                  <h4 style={{ marginTop: 12 }}>Manual key</h4>
                  <pre style={{ padding: 12, background: "#f5f5f5", border: "1px solid #ddd" }}>
                    {data.manualKey}
                  </pre>
                </>
              )}
            </div>
          </div>

          <hr />

          <form onSubmit={submit}>
            <div>
              <label>Device name</label><br />
              <input value={deviceName} onChange={e => setDeviceName(e.target.value)} style={{ width: 320 }} />
            </div>

            <div style={{ marginTop: 12 }}>
              <label>6-digit code</label><br />
              <input
                value={code}
                onChange={e => setCode(e.target.value)}
                inputMode="numeric"
                autoComplete="one-time-code"
                style={{ width: 180, fontSize: 18, letterSpacing: 2 }}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <button type="submit">Verify & Enable</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
} ^3RG3nt1S

react ^TmNdblBL

controller ^rD8orVJW

razzor ^E7sMK57W

react ^yK7uvOMO

## Embedded Files
f4afe1cf3a3415cb6193642b1a9c82c15cca6269: [[Pasted Image 20260309012658_418.png]]

36fc8b849154ccaddb3b4165abb558dde023139a: [[Pasted Image 20260308041508_634.png]]

38392ce3717d32c67073ab88c632e8785d0768c7: [[Pasted Image 20260308041513_307.png]]

ef967f0ae1c03f111abeafd6dda6683c9d80a9a0: [[Pasted Image 20260308041517_786.png]]

7af8538b22f11c7e90b1a096699c4ad809c47c1f: [[Pasted Image 20260308041521_944.png]]

4cfae66955d4d033af083ed8e0b8c6a1e82c512b: [[Pasted Image 20260308043807_998.png]]

3053a8b107f0b3d42dae5a6718f628db0384b0a7: [[Pasted Image 20260308043810_979.png]]

7290f2febf81ab1bdd4ac646a51b1e18332aa210: [[Pasted Image 20260308043816_998.png]]

b99c6cbc453267a10f84e08a481d6e95b27f3e09: [[Pasted Image 20260308044002_877.png]]

d2414331b952d20b7a32555c525e44c6cf2ee7f5: [[Pasted Image 20260308044005_333.png]]

9046a505aa0a09438e295308281f8ddb2426ffab: [[Pasted Image 20260308044010_618.png]]

af22e1dfcdcdf5c799f79fd11fc86772de947400: [[Pasted Image 20260308045229_406.png]]

1db6e01e3e2e6d2bb084576a949272c0cc8d83e0: [[Pasted Image 20260308045234_601.png]]

e57dcd60a05ae6d5c4ad201a21b9dbe3159b606d: [[Pasted Image 20260308050116_992.png]]

7c889d55b77f75270011bd2832abaf952bf683b9: [[Pasted Image 20260308050137_157.png]]

b13f3b8c336eb2df56198d3d557f2e766f97522a: [[Pasted Image 20260308062249_391.png]]

a95d6719c0928131129fbd4262e86b296c831d88: [[Pasted Image 20260309005808_395.png]]

29ad9707bcb69efa8caa6de5e353a47aeed6a178: [[Pasted Image 20260309005820_054.png]]

e6d3a7ccedda224a1f37911e1a917786843fb622: [[Pasted Image 20260309005824_345.png]]

8fa8b125a9e255970c1db089c6c4ddcff611ccd8: [[Pasted Image 20260309005836_016.png]]

e145f76eacb1d3150a5e98f3942641cb768a16f8: [[Pasted Image 20260309005839_500.png]]

21e8f8ff95d0866e2fd33f7a5d8816b93d2356df: [[Pasted Image 20260309005843_582.png]]

67fcfdd33137812f38aa8daf3bf5d983c97adb1e: [[Pasted Image 20260309005848_119.png]]

eccec5902aec7bdbd6ca26afda74d739faa10e70: [[Pasted Image 20260309005853_349.png]]

2d4e253db5f7189d30030489c0a2ba1144c2043a: [[Pasted Image 20260309005859_279.png]]

0dd1f860137ed60d94f46c1900cc6480b1c5afed: [[Pasted Image 20260309005911_009.png]]

0fe6755d8ed6587f1d57b1a2ca145b53d1eb0fc5: [[Pasted Image 20260309005917_476.png]]

bf2ac35bcfba40f9b843116e77feb89f4fa42f9e: [[Pasted Image 20260309010031_494.png]]

708db6e44fa50295383452052158d6ddca2b401d: [[Pasted Image 20260309010039_536.png]]

63646802a6d05c5f5f69f8d39f12ad85ab1bb42a: [[Pasted Image 20260309010609_259.png]]

d143beb1453d9e49a1ff6ca67ca509e9a2721c80: [[Pasted Image 20260309010612_462.png]]

af235edcffe65d46da82db4e77a8ba6e9ca4a4b0: [[Pasted Image 20260309010617_298.png]]

e372e25659cd8492d590b1c78197a79161fe1138: [[Pasted Image 20260309010640_516.png]]

6a38860e29b2b494b071b2bbac3bfa7967b8b768: [[Pasted Image 20260309010745_536.png]]

bb7d4287772da6f5ef5cda43036b8900e0779c8b: [[Pasted Image 20260309010749_968.png]]

2deb84785659cde1209afe820582d971cba69df3: [[Pasted Image 20260309010753_197.png]]

8abb3ea9b6d36283817ad8950749c2183e1301ef: [[Pasted Image 20260309011841_773.png]]

d5a1cc3f1aaf10d55be8e74f40ca763884932883: [[Pasted Image 20260309011845_841.png]]

9d63f2a2a9e1c307a9a9f1321e1e52af646532ff: [[Pasted Image 20260309012159_176.png]]

0d51dc1dc2b9c9c7c06f913ae204199a444e669e: [[Pasted Image 20260309012250_576.png]]

dc530357ea47cbeb830955ce7b35398434c9daa2: [[Pasted Image 20260309012304_832.png]]

1ca43265724228e644235f7f6f316180091f3676: [[Pasted Image 20260309012308_860.png]]

1f864166f4988aa410f2c7eb802fbf3bb175e080: [[Pasted Image 20260308045312_389.png]]

cefa69eacbff872abb260620ceec61735c450a74: [[Pasted Image 20260309012638_213.png]]

ba98b379a70abb32d32f3a4a9d18115b037698c3: [[Pasted Image 20260309012654_853.png]]

1071957d4215b6e5a90f4bbfdaa37a0865dcf1ea: [[Pasted Image 20260309012707_252.png]]

afdcc998482e456ae637632cfcc2526174e07596: [[Pasted Image 20260309012711_306.png]]

9548efdf4955b4094c2e042236a1dd5f0d1729a3: [[Pasted Image 20260309012717_381.png]]

a84020e08d7587358b4a37b43ef82105e0c4a823: [[Pasted Image 20260309012722_849.png]]

9880d531298356e520f8c8a0fd5df2844c570a33: [[Pasted Image 20260309012728_401.png]]

cc518026f451c07f01129ffca8a51753d5051fda: [[Pasted Image 20260309012736_013.png]]

f6e4c6934e83377a468eff572e183b93c77ac383: [[Pasted Image 20260309012750_468.png]]

da1f07450d305a8ecff56b8573f0db68a335e6c2: [[Pasted Image 20260309012754_111.png]]

6131621df40b32de5a86d1a4161cbbe812a71985: [[Pasted Image 20260309012757_756.png]]

573d9aa313750e58195225deaf39d602bc96f701: [[Pasted Image 20260309012802_738.png]]

62c1c2925925cab080b7f539ae6c1ca0e07ab461: [[Pasted Image 20260309012809_414.png]]

34226d57c3d4feed2849f62da0d5c512bbe00dce: [[Pasted Image 20260309012819_466.png]]

69500a7baa8cd668404020b2869d7bd19a9d3612: [[Pasted Image 20260309013317_092.png]]

fca73d7345c083fde72bf81668fe4d9f08198775: [[Pasted Image 20260309014128_145.png]]

c0f0d81876c07115476cc2de155fb7877bf233b7: [[Pasted Image 20260309014130_256.png]]

0930efc45eef41b7df913ebedec46c090b132be8: [[Pasted Image 20260309014537_826.png]]

552ff88aa570eab7f8086c3a7ebd2d971b16000d: [[Pasted Image 20260309014726_991.png]]

6a7d386cbff31bafea1a6ef9a0d5556536635457: [[Pasted Image 20260309014956_760.png]]

ae61d75d450456f66b01b7af8041155ccaf8fa9f: [[Pasted Image 20260309015000_352.png]]

861eac0d3e5acbba0c77f0ce951393d9a8a12059: [[Pasted Image 20260309015120_492.png]]

c2132aa91d2c663828219d18b939eeb67c67f99a: [[Pasted Image 20260309015124_119.png]]

52e0b7d4354968b34848d5c67c3a0a1f4a978583: [[Pasted Image 20260309015128_568.png]]

f59bbfcd9ddc907b57ee45fe284767ea6671c90c: [[Pasted Image 20260309015643_763.png]]

2202bb683a17b9cfbaea7fd754abcbcb7aa6be21: [[Pasted Image 20260309015648_597.png]]

017ef39b41ea012df3fb02f89d5c394c6415ffce: [[Pasted Image 20260309015651_741.png]]

49f0b859ca75bb299f971907a1b5f765ab95c0e7: [[Pasted Image 20260309015655_796.png]]

c99022c3ab3367bd8e2a98c18ecb211552ad1ba3: [[Pasted Image 20260309015659_956.png]]

b486705c403b02bc4953ffafab0b93ce710ae3cf: [[Pasted Image 20260309015705_332.png]]

a22d6553684eacbdf7f984dbe16c196cf7e97bea: [[Pasted Image 20260309015710_391.png]]

0e5934a56cd7f0f1cbccfe64116174df3a8c6def: [[Pasted Image 20260309015715_903.png]]

9b11a7a41d2cadd07969b13257881dfd2b39753e: [[Pasted Image 20260309015722_351.png]]

148627d551ae98a8a3e21a21eb21249df1495cbf: [[Pasted Image 20260309015733_414.png]]

3d84fbb1d7e3236ec90ed07417c712ddfa671b55: [[Pasted Image 20260309015737_366.png]]

008af801e9094e140383481cc1b6c04f2c5ee5d6: [[Pasted Image 20260309015742_239.png]]

b8668b0b1e7f2a4f5784b394a10aea0e858f6211: [[Pasted Image 20260309015747_392.png]]

a5119b2fdc63298dbfb20fd2e7166d5356d979c4: [[Pasted Image 20260309015753_632.png]]

0658797da8ef57f8b0e727ce226150b89f3a87ee: [[Pasted Image 20260309023407_509.png]]

208d2e042d14a272adb340f8f0e4084bf67b3003: [[Pasted Image 20260309023410_360.png]]

a9d8d5295da6c4d702cfca9a5fa7b4c0289bd0e5: [[Pasted Image 20260309023413_708.png]]

a23deb8e93b2e37a9571c04edbeee2cd2452c6ff: [[Pasted Image 20260309023420_039.png]]

ef3ce438584b150b491c5bb7fb792c5759e0ffdf: [[Pasted Image 20260309023425_126.png]]

67413bcad1d2638716d7d1527f0e135249544ac3: [[Pasted Image 20260309023448_421.png]]

445c351263085d9fa14d6dc956bdb3a926ff77d4: [[Pasted Image 20260309023453_343.png]]

ca9f8fd4bc146009e146da8a23cc816ce3456d2a: [[Pasted Image 20260309035524_513.png]]

85d11c0ea253ca5e165f36445c18603c96e00c40: [[Pasted Image 20260309035533_484.png]]

%%
## Drawing
```compressed-json
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=
```
%%