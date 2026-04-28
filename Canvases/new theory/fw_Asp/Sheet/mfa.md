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

helpers secret generation ^YEP40d1y

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
N4KAkARALgngDgUwgLgAQQQDwMYEMA2AlgCYBOuA7hADTgQBuCpAzoQPYB2KqATLZMzYBXUtiRoIACyhQ4zZAHoFAc0JRJQgEYA6bGwC2CgF7N6hbEcK4OCtptbErHALRY8RMpWdx8Q1TdIEfARcZgRmBShcZQUebR4ABm0AZho6IIR9BA4oZm4AbXAwUDBSiBJuCABhAAkAJWS2AE1NKABOKEwALTqAVQBWCgSARwBRZLq00shYRErCfWikfjLM

bmcARgAOBIB2FK2AFgSt3b2tjd2eZJXIGHXT/qSj5N3kgDYN67b3rduICgkdTcXa7fr/SQIQjKaTcV58IqQazKYLcBL/ZhQUhsADWCCqbHwbFIlSx1mYcFwgRyUzKmlw2BxymxQg4xAJRJJEjJHApVOyUFpkAAZoR8PgAMqwVESQQeIUQTHYvEAdSBkm4COmiqxuIQUpgMvQcoq/xZMI44TyaA2/zYlOwanuNoS6MREGZwjgAEliNbUPkALr/YXk

LK+7gcITi/6ENlYSq4BIKllsy3Mf1RmPusIIYjcDZtNo8bZtQ79W3uxgsdhcNDJY7/ausTgAOU4YgLuzaW2S/WSG3eN3dhGYABEMlA89xhQQwv9NMI2aNglkcv6g/8hHBiLgp/mbaDkjx+/0nrt3lqykQODjI9H8P8iYzp2hZ/h5zmolAhP6IIg2TjZQFVFYIIwkD5hWwLZNCONoNn6Q5sDwYhiE0ZJNEOQd+lwTRNDPLZUIQBJrg2ZI2lwBVmHc

cQA0RMBK2mBjEWDd1sGxOB72zbVJFCAAVLAoAAGTjO83znBAigAXxWEoygqCQAA0rHeZwJV6QgADV8BxTTiDqABFABBBIYEkBJCAVWZaPKRZlGWd01jQTYdg2bRPj2MEtm+HhQX+Z1UGcYtDn2NoEkOHZPn6XZDiHf5AWIYE0BirZ4gQ7Ci36NowTaCEoRhQU0AiuIBxPf5kSNN1tSVPUOWJUlyF5SlqUFBcGSZVN2UJeruUavkWpAsVJWlGyTXz

DFdVVdVNQm5V9RGyoxpTYQLStAs7QdJ0C1df5PW3X0N1Y7VQ1wcMD1QLNHxHeMnPQXANmW1liHTTMHwxBBX1QD5YvC/pTibJgWzrL73lyqtAdrdsOE7NBouOHhIrB7VRwnYJ9xnCSFyXYgV0yAVDq3Hc90+y43hPPtz0vJ9RK4q7tWfPFzvfT9qu/X9KgAxwOGAkMxQQcD0GSXtizEV5LmIY9sHeM43lwrYtil48EFOLZ+mIPZfmwXYqJogp6MY6

YNhY/52PtWmIX4wSRNvDGP0k0oZKKOTIAU9A4BxChvWcUgtiMhA6jYXi4B4ABpQ4sHefQrPgGyFiWBVbpcjY3LCnhLw2E5C2i8F3QCoKYuSbQNkOBHDmPd5fgSJGygSpLUAvQ5tB7Np+nefoSzeeDhx4/LYSK7yUi+HPtQq2iqrKGq8Tqrl0B5fqBQVelGT2tlp4a8lmoX3nxQNI1FUJU0vzmtVEo1NArwESb5sNUaD/G91zUkF71vde0GS2l1x8

gPafT9AojrKCdM65trrEATBIXAPBHppjWmgS670SZgnbieNoA4AY1k4HCOK4MMEcChjDXgewIrFkSN3eS45JyfWZggLGT1cZrlyP/Qmu50aHjJqeSmF8IA3jEhdN67oGZUMxl+Pc7MJCcyAoNMC50MDCh+LsYUCRcAIA2NgBIyRhTJw2LhEIwpiDvFQrgCuvZsBtGIDsXAFFkwYl1mgQoTEDalCNtMABkBTacTgfwniltMDCRpuJO20lZIjhkaMA

y3oQoACsxxsAMjwSQu5lAhzeF0SJAB5PI/xrLzDsg5bUidthDiLqgs8vk/rZT+v5dYGcEj9m0BcIsRwrjy1BvFaaaBTjV0gJCaEfdeB+XdKPNEs1ardRntAPqm8aRtWXp1NevUN78mme6UCw0b6LTvlRK+J865cMntfPeS0zQrSfrA1AjiIBv0dLAbaX8PQsl/gTFZYZ+bnXgaA8Bd1UjHKes/Tx3EJ4fXOqTMu/YthFnQUDOErdIWQw7LRIcg5d

iFiwrGChaMhF21ocuVc+MmHum3CwxB7CKYay4TwkB9M2AviZsI1moi/wSO5lI15lRdi4GFKrIWmgeA8E0ao3YCAwqaG0VXCuRZsCHFwOYqukrdjYA2MKHWBBaL2MNrcZiLiTYcUpWUXizABK+Otrw6hQSnYhMqBKHwxAhD0CMAAKS2PoSJ9BJB8S6DiLoAAFZwIdKJZJjjk+O/wCk7EbjwQ42VwrwSOFXQ4VTnLItVtoCKg5YoZ2OO3Npp8QQJAu

T0gqmpyLlW5pVEZU8xnryaks1q7ol4dWxvM2ekya1SLWYczZ5aEA7LPrwLtu9b7yh+atDML9tRXI/ucna7of4HXxcdF5At3nIxuomQ40DnpnOXYCkmld5ENNhZg+sIVD14PhQWWKDYeBRt2Gi1GCBWGoGodinGuL1zzrKIS4mwKjzkzPGS6mNt/l02vNSxmtsWYTzZoy7IXMeYrL5gLCASFZwIHFWeYghx1bJGSByk4yQ8xbGIrBKW91lY8GwBWH

gmhlVGjVU4jVzjSiuIgO43V3SfF+KA0+iSZrSjO3KDIqAAAxNgUBnCHA4FUKo9AvUcGExKYUygVRGTYDUPi0c5gSDjvZBO1TexuXeKmvNfY9iIXeAmwKF5dipXUdesuOx+xlmzXXHYSRgqnF8sWaKt73QFr6Ze7QGtizJGC9ccKJaURjy7U2iZiyBozIbU9WLc8pm1uOkNAdGyh1Hz1D2mauW8RZdlJ2h+Jy/nnI2u/G5n9doPLnXYljQDWXAdjK

uiB/QN0Ve3QIIFBZorJwvNcYeZRmy1jhOWU9+DaLbHlmnYsqs72UNpViut2N6F4sa8w79XYSX/qG4B3hPXuFgcxZBy+DKOawckdvFrgtam4ZghnBRCR0KYZ4LuBAOFpbbGFJeQimh1FHEB7gbWNiVV6wcYx42bEdWtb85x41EH7ZgEdvxi1EhIkJDkfgFUXr9B8TYN6BAXRmBGFSf0ZQ+ghKadjrkvTzlti+W0NFEivx3h5tKZZ5wDSU6/FVhnXl

Z4ukAnaVO48eVemFVQJeyLZbCv4krQs6tCW63tRXl1TkVb57LIyzvBaJWcus2PmLvZV9ivGlK9qR+FWLkTpq1Ou5s6/5beeadO7x24xgNuhAIxXWt1eJ3cCk4CMsrZRF2No9X0zxTfPR088rp25kJduih9Z2aFrboW+xhrvtRfsfaTY8HCAMCP8XwgFkBBErfOzqS74jrvMtu0hq4YVhR8oQJoTl2iRWaFQlKqWsVcAVhFSo3sx5cCQIzrR1V+to

dath2beH3iDVWzL6ah2wTkYyMIF0McQkxxCH6JgVsmBJBVH6AAfS9QZAyuwjBwGcLToNumQ36Y+EFhsZwK6HHLN2ZPEA85Phuwm4KlywwUzg/h3Ra5e0YpG5VZvIOcthQZW4s0/Ne5pdipB4ypBlS1osFcUsW1VdtR60NcCD4st4EN9d1lDdD5jc8tTd+0DdLcjcygbczk7dNoHcak6svQGsAwmtF03lA8XZ2s7owcytfkA8K9FQ+sbRLhM0v9fN

tRI9gZ4RY9oZaISxQtk5rhsDkZU9H1n1M8cU8Z31c9P0iYC9f1i8DtS9uNjsq9kcJo683YG94M9c7sIBNAJV3hsBNBJV+w052UM5OVw4ThcBU19EhV+geUFECMq5p9Id1V9YYdtQ2Ml89VEc19eMN9zUt9KhMBnA+JNI2gKBSAmhhhWxNAABxTSZQVsDYGoKCOoPJMobJbTenV/RnXsfYDnM8IbKubsaWbnIcC4FILCa4csdRLnKAsXCuO5fzaXB

CJQsoIZNAO5fZMglXCg4g9XOZJXZtcg3XQBTLJg/eFgy+E3HNc+Rg6g5g2g1g8rdgqra5AKbgmderF3fgkMQQ9jcoUQ33LYf3UdDI3rT6QI0YkKEbSAFQ7gY4O5FQ6bAsMiSNN4XsaE8oAw9PF9DbMw74glSw4lIvUlWw+mMvBw07avDPelH8GDQCRvSgzw4gCNYuHDDYbw9uZk17dlIvM8SjE8BAH/KWbANvD6BRTrcHOjWfFI+fNIuHcvEDDjF

fI1bIwJXI9HfIpSZwcyXYQHffI/ISXoQ4UgSQYTYgUTTiANLTdAHTVoyAUNKueIK4RIEsJAvsYsEYsKfYc8YsdKduZFFzGAkiSXQtIqX4OXPAugitLXZXHXdLOkPYxtA4uLbY44kUU4u484h4y4+g64vtBXC3LM++a3J4kEyrV+Tgt46dbUZ3J5Bdd3JdYQ/473RMNoYE16aQ3MYFIzH4DnNk09CbSA5QiGNsOPc5JA7/CsaKJbDFKknE7POsiwo

lH9PbThQ7P4xwgJGvTEFw/8NwllJDMKQfJ4HCJMJMMsIWBAa9fsEPC4TlVCHlEud4YUWcGjSUmfKHGU5jbVRfBUi2ZUrjE1HI1HTfeSUJMcMcKAFUNoSJKwKWAAWQrGGA2BVG9C9VMifw6ODUcjf32F8l0JLlbh+xWLuHWGFySFdG7BLCnN8guWgO4BaRDL6WPAuTWNQA2Kvi2LjMXkTOS2TNS1bW3nbUHWzJ1CuN2VuI7QuIgDYLLI4OqyrKd0+

MXJFF+NBObM+V9yMnbL+K7JBCQL+lOBPRwShWPQRJHLPQ0NzTLBlmwX0PvUMLpTpHWwXI/UgHzyJL/TXLsKOybM3J41WxpLEVcPpPcJOOkUTDbx4BUWICgmIGwFiv6C1iLGFG7D0WTigiQNBA+yFRCnhMSLsWlIcVSLKHSL/IRwAqRy3JRzR2KAxxtOqJDiMmcBs0UiaGqMUVbC2AoHoAlCEjSV2AMkwptM6Jwu6ORUHm2D2BwxLE+C4TznIj+m0

G7CGMGNdG2EDO4FQX/0WLhGLgjOGXwP4sIJ2ITNmSTJjMONTPjPTKoKktEv2XyxuILLOKOQkJHX9HkteNuR4P2i+M3Dd2AXUq900twAACEdL1K9Kip4JBcW4MTYTYYSx1CCEyxi4K5BsZy085zjDX1TCc98S89CSVziT9sqYfKNzKSnCRFaSrtQqDyZENg0J3hiINgEACNoqDFqNAcjhop3hLFI18K1FkJCJexiICq6JPzirZTSr5Tjt9VDVALkc

+M6rNT0A0lCAEgxxehMBiBHVCBehcBIkNgjAQ42hSBnB8AQ5hrbJsL8l1gxYWdQ9edy4bNuc+xCwm4q4I1s54S6Kxcywhy9V0DNQY8cCotDqozFdLqUzuLEtSDjqjibqIBVlCy3qo6nr8yo606rdHi/BTk5KXjJ13iazlK3KU61LyqV0WyIEqhIaq6g8uxk4dhXh/oTLxsiozgUbaJ01soQo0ERwsScbiCXL8aVKIAPKSavKS8yT7C/KqbqrnDab

696am8ZEvtdh4r9ElFallEDEkqpUuTtESxvC0J2aEI2hNAOcDEJb6MGI59vyF8PEG6lTFaqqAqwgVaBNXYIBIkmg4A4ARgugugah78Sj+h6gOB8A4BdgqArS6c7bVgHaJqUF4Jhcsoop3aexG4y4yYzMtD/96LkpUF3JfgGwZrCxLgRddr+4Soh4Dr1iYtE7rqeLzq+KY6BKiDwrhLssHrtkGCXrMz0686Pqx0yh7dFLfrHly7mtGzpCQafdcAxx

67jtobzkEZBxSowQBzO74127RyrLYYvh1FixWlB6HLsTcbcSCaAaiblzdtSbvLZ7fLpD/KjCgq6S4MGa2VoJwViAzxNBQRUr/T1r2TmTeweBcIOUW5qM/texvDb6irDYSq3E5amyFbV9uN18QK8iwLKhlBqiL9mBhQjJ7VkhIlhRJAxxFJIk2qcQL8hBNIjAbbbSGdUBQYkgTwLgGkyxUEsGrhJqBd5YHtCGA7ewmKMDeUGH2KmGOGTq0yvDeLV5

mG47KCeGaDiyoNxLe0zc5oc7pLZLPqi6uDqyyhayZHK7PcATcBRgVGmy1Gvgvgf9SIEaLK4S9DRsLKkSbQumI0wphjzHltqaR6s8x7y7J6HHp7STrxyT56aVgWoNdymUwrbrPCRUNEMIFYcMWaeVErPgewJZ/HopRSLxnyKleV/UcxbFJbkjpbH65Tfz5asisngLarv6ZF8AYAvUvVEhehJh4HSRBI2nNgwRG4ixCky4NGGw9HtQ84M4PhOmOdrg

cMjghwuEiH2mEh3h3JI0fgcMbN/muEaHzkKxSG24eysJjhLwuE2KOK5pYsABiNm51u0xZth5ZuZpOttfZvh7ZgrbO163OyAQ5sRyACRn6j43g/6gQhsoQ+R654TO5zs2Q8c3sH6bKC5RGk1mVz53Bb58czOMNZGwF2chFyARcUFhhceiFthRxme0DeFxe90KcXxDZLIVAdQBANgFMSgRWtthADtyEbtkMTgKACUQgIwGbEsFIGaisFuUqVEkdnIY

TU6MUAKDEltqAIyIgZQYGbhBAYUZO6sKAcwAgbd6EPdqAM2E2Ud3AOMJgORxUy5UgaEOMAgPtkrdtzt4dwZIQK9lo1gSd7gLEIQakmFy0GoEOm0eIDEjJlUllwK8Dlx/AL++q33HgVsDgOodkfQAyOARSDYA2+CkOC/FUZgEOd4Fp0a+25yY4NyMERIYuCc44AM3OapPNV0ZawsBbM4bYac2YvMo4IO7pKDkGYT33XAyOrZ0ZT1lh+O/Y2T1ZvXd

Z+4zZnMqaPM3ZvUH1tTmS0so5ishSiN0uqN8e2RuNp9hRxMaopNp9tRrKF4A1iPN5m0Izbu6FS4L4UEEXFGIFptkFkwqt8F4myFmw8m5xymxtj+sDi7ZekKrxte1stWH7NoNRBbMiHQtoYUXvJ86KpAnlH4aCAccxIE98pIhjL8sAFjMqplyq1Uz+9U1WvJiQL1FTJCSQegHEQgDJBILoTATQIQe1LoTSTQR/AVrCl/MawKV4QuI4BGLQvYDRwcb

nGNOIEKRb1nIWLKTajpH/CZzULV6Zu1mTnqK6pTs6pLD1072OtLb1wN6Sx6gRgNoRoNvT/O23Y5yRyNv6szy5psqziBGoWzhBYFedn4HsPsHR8czNr5scwcUGAcUlnzoestrw0eoL8w9ykL2tqF8LpDyL8DfzxFuLvc1exkpDa9aVG9fwq+toA93ABWCfAxL7dm/sCI9lIFfmy4UrqliHQqqW5JmW1Jxl9J5loCtUnJjU5r9AQ0/AeCr1XoGAOoC

gQ4UbngIQLYAyYTIKC/LgcbkaxB+0h234FNBGZFIIquLVpAlb5AoLZFbjguHzHb9p1uFnWpDuGzP6Muah0TzA0qDE212Z67zh068tpZzXYP+Z5O1O+7313MiSwR+63TkNm0T74zs5suzHiu2Nv4gHu6b0YHnMFNsiIzXyBscZ/R4GYuGHvNuHsES4DncKf/Xz0ton8t9HzbQmpcnbHHsL8lWF1xhe6Lpe4K0nhL8n9egxXDeVMQQxXlKVRVV4WGl

RSxUmJAl4bL61xJgXpxFJ1jNJ6QuDpW6q1DtWiAJoTEZIISXyYYGAUgC/HEUgXYL1YTBACgRSAyfl5twNCb11xOEsJIB8AzTqI80JcbntzieARQU0ZwIWMeARgXALMAnOuGcAWK+9UCI8STowyOqKdbu8nC6pHy9ZCUdOWyP1s9We5J9HoojVPoZ2+q1Zvu0jLPuZ1z7XN7UhfaqMX1OBZwsoxlYcrggLA/B3O58cKCYxQLN8UebfNHpW0762Nu+

VhVcvW0rwD8n2bjJyrF1H7ItvGEgLYLOCewnhLEV5YXGcAVRoQTgqXXwlhniovlPgqiBKjz2qjUs76jiTVPS1loi9D+YvZWo13ZaVAjARkZQMoCEjDB7U+AMdipjST2o2ARkUgN6CJDDAqOhvCAP/xLj1IPIxwbQmALdpsdnIiEHsO5DPBZQM4hYT4KM0E6TY0CUud5ja0wEzNsBBAuTmrndYR9xkIfBZjHxe4Pd+GmnSSiJWT76dQ2lySsun2/i

Z8u+qlHPsDWubW0fkMCMsqo2L7yIkEaDKHokGc619DG45H4HmiPDI8LGw9ZylILxIyCse9jXviSTx6KC56g/KLu42J7qD9yiXCQConLCpUWaDIEVBLAQhKJ+gQqbQeRCfJYQ/CF4LYPdGfJ2CJ4DgpJrvyF7783BT7I/u/WyZss0OIcKAPgAZDVEYAUAQ4FAHtS7BNITQSJMfl6BbBMA+AeIZNxo6BRws7kBAQUM7gyx/8gBUActVbqPNW4F4DEh

qzbj0ck8EUVWJeG9r7daGWBAPtUOO7Rk6h53MPo0K4q4C1mxArtJnS05FZY+vQ97s8RoHF1Tmww0zhc3GEv0NKijGnNMM3SzD7mxfCuELBbgC5lhZEQQeo2r785akWNRyoh3b4HCbGLGGtucmsJnD++lw5QUPxuFqDPGN2CfpUBLDKxOUL5FuOrAnJXk9EOGVKkPhK6DhvCyQZkn2AMRKoyu/PWloLxcHC9n6tXN+vVxqqgUXYMifoAZBxC9AhI5

+fAAZE0i4Z8ARkIyF8CEC9BhgJIfXrbQpFINnI1wbVkCPhioklWe3LIYFCHBlgm4ZwcsBmhQKIDtQGrNEkKK+hlCMBEdLAVHVlGCUGhl3JodrjlHKcFRCuJUd0N4ZqiqB5ZcdIMLoEmcfueooGgaLz6+54KbAxui6CoyWtCwyw50ZX3zaFIeyxaEttjVR4VtAu0gr0djx9HyDoWFw5Dk+CDGqDa8JPDQQ8PQDSwoIeiCWAOFZF8ohYE+QiBygwjC

g1YEPUxOyjQhs1t++YqEYWJhHFjRedXBDg10l5NdKxlQfAJEngp8RWwXQLYEJDBpEYag9qEOPag4BGAqgfEFUHEN7GtMuiVIn/O5AvJvAhwUJaKPNXWDf43IZEOcc3EQhHBnef0I1qJ3n5Hcg+zQqPqwwPG7iuGt1FTkWRIHx8dmF4jZpQILoGdbxRne8Rn11GMC/u8bGundFbAfiwS50RIKCHZxL9bRS43NkDEAlUN04LcEipiV2HgSO+hw6CSc

Ngl1t4J3CJQUhOuEoSdyaE+4eGMeHIQEAlGVOMoi1i95e8vhSBPzT0Sg4sMncWcPdASAIAzgtEirnSyq4/kmJ7glieLzYlIiz+K7HlvgCkwVwJ8HAFUPpGwBNA2g1RLoJZHknUcBxVIy8CAURSJBfoHwcTnnGRQNgWRoIH/DhiLAnhORYuUEKlD7KnBpYi1S8HFJE4VDhR/vCybUKsmED9xCdHAXuJPGqjnJGnBPuQJ6EeSPumok5kpX8mjDs+z4

q5sFN9xpIwpMhT6BXARgeQAWvA0yrwF/EAS4eroG6T8F8gujLGAXPGhjwRnejC8uPf0YhIETIS3RqEu4WTw8IU9MMBgjMfhFSqlgJYroULMQjUSQJ6QycIUokDLiUt7BfPGlv1ILGDSn6fxeEWWNP7S8IArYPiDUC+BCQjIPAUYAJIlAqgugrYL1IqnFBwNv+1pPsX/3WC8pUowsK9OKhiZaTE0Q4bVuoiwjV9wosUcTlyIGbV9s4g4cFITJ7gfS

ZcA8L6eHXlw7iVmx4i7gDMlEJyHJp4jOk92k4qj2holFPjePEZ3jHcUjPgkcMRke5/u1zL1OjIeZACsI8EbsFDymr2jCh8hK4K8Apl7D3RkErKdtjkF5TzhBUgMUVMJ7D8aa7M8fpzJkQJBUIiqJAiZkFTb1iAZYYULFAVRhQEgyEIzDsBFSUYOU04XMfLPvqVdquB/OER4JP5eC0O3oHEM4CMjegEgTQCgCHB4CaQJQysTQEZAoD6BMA+gOSdbI

Qb9ijeg4kKNAPCzwlwo1wK4Nzh2BhQuOZEH2qpNul5ksZa4wit9LjmAz7JbrWyfHKBncM05mc7tBnPU4HJIZw6Tyf0PDa+SdRj4gKfqORmg0hqJo7rOaM+jywbMycNuKsPxlM57RJYE8NcEcw7C/OI8qmdY2rYwT6ZffdcupRUGszSpY8sMRPMqDY40MSCcxHmDbinBNE/jXUsfTwDFwYi/YYgGzUBxQQJSvPKUjv2cFKyGWw00+aNM8HsTvBEgL

WZgHtRjhCABkNoPgDHDvBJA5RXoPoEUiaRTZUcTaQkP/7ywWcRYULD2T2DNwoFDmepD8EQhgETwCEZ3jsFSnGs4BaCghXZND5YKk5v0+ocDOzm6dHuXQxPqQverkLqB3k2gYXPoHFyY2SM8uSjNwBf8SykhM0cm0xnHhTB6JBuRGl4WLdjM16duRlI9HiKcpkiv0dIoNGyLty0GOmuPPCpos28DIPsP4Wy4RFscl9F4Bwp6kKIO84KZebOBLhyJX

W1EOWY4Ifo2LXBdi/8qWNYnljcmnEiQBsDgAhw4AcmZQGwGSDOBIkHAcdjwDSTKAoAWwUYKFPCUALEhDtHDEFmlixRI0JcIsBXCgXgpC4rccVqgnRLyxneJSFBQjDyXEKClCzEggp2Tm4LU5IMxUUQrErac6VtS6GQ0q1FwyaFCMpgRMI6USgq5KbEhIMUQipSs2ZEf/IiTHKJBG+pweuaBNdE14IJ1MqCT3M8pSKKaMilmcsqRblSlFEgCAszUF

KHBZwTwa8rAPLCJB24CEQiAYnipiy6OFSiEVYqYwPKixKss+dF3VkfL0Ag3CgJgGiDrzqiYNcJJpEwCqADIikZIKMGsR/yuJ97YVlCSbhC50oWMnQqlLzhYrsVaca1ut0QjO8vO7kShrUhihRSDWa4u5IHx+mVAnWKiGtTZOKVHiaVKdDMhQPpVVKIZl4qGRqLZWwyi50bH4nQvaWg0NMTCs5M7BmA/9eAiIWquFO4BtxcG3wV5nwLkJcIJV6w4u

K6AignAzG9lYRcGMkFdzPRKqqemqoi4ariprMuAGwDjA2N6Id9MAF/FKAJB6IriMAHevzX4sM4cMEteCg1T3rn1e/HcqQCgBg0vckidSrBhA300oaUQIDVEOxAUBIQ0qP4rBjg1sAENIQCzv8EvWct/lwMPdarNeWerBMlQb0E0FwCYAVQ1RCUMo17GbthWEaHBqglUmvBRix09joFlqThQPIf0M4CLg1ahZ9gJcVWH9AbCbDnM5Q0MuchgXIohN

A2ITT/hzZIgxRlkqtS6xol4D2G1KzBW0JbVniGV+yfBcGz6H1L85PkppQ+IYFcrAplna5r0H5UkxYo+FcsFwo7rqNzKawghIWBij4VnskyiQYqrEXBdZlvosmuSk1UxdoAQrCQMKCJBWzrcvbKLegBi1oaQIo7cdkBxtDtwWcMm0PDlrBBvSU6o7FdvoDXbcAN2gkc9ruy4kHsj2TAE9u4Eq2Xtr2bEW9ve2iGYbX4L7fwO+0S0p1YtCoXAH+zYA

AcJ2tEEDhFpvAIBIOEctyB81fqZMxpE2pQURp/rVFJA2ASJNUTYDCgvUYNbtLsBDghxhgzAaovgCqC8TyRdsxnJ8Ebj5DXS3TK6W7MCgIQikhQ1nGRH/RVxneEBFNEWCt5hQyIXslBXmhnY4Ywd4OnDKSsZUSiSlUoopVSth0pym1d1GpenLbUELDNb3a8V9XZW9rfuA6oKaDU0j2bzopLGVcKqh4DKm5kUkiFGguQt8wJ/mzKYeoJLBa4J/cilG

euHl7r5FoYhkrqswnfRK4kTAxLUkoxkS/sWXQiORE0SRNzEOEHvJhEiZ9TD5A04+bCOeULbHFE0jWRKFGCKQ6gRgKAPoEGpdB7UkSTQMJgvyjBDgY4NJA/0u30argcBNuH2Fnkt5Idk4zYOlBZE7AZVvwVBNoyQG9pCh+wV0OHoj3h780vvO0THMjL5KcFmCylfgMR2NqdNqOgheeOqUdqyFrK0zY0pLp+TOVJc7lS+OuYqgSdBYBsBXB7Ksc8Zr

m7GU3PSgvB8MfmkRfsIPUzKe+uUhmQsopLnqtVZUjmesqQzGKy4mgDvAYozF09I090KwXgGlh4AngdPCiD5ugjRrZZliuidYvV1PKKqLyxbStpkQGRDgmkfoJIAqLlNhMBkeCjwF3YbA0kpAbKF0raITrbZ9G/nAcHkThRk48EMuNzhe3elyIhYE4Fa23U1wA6YIFnEZi43AGGOsHX3lHPoZx6pOZKxPYUuT2abU92m5tRnuIVZ7217k3PV2vz24

7mlfawGmXMJ2KNFIle8+PK1bpVwa++M0LO5oSlw9tgx4eCHNrSm7qUJAW1ylnzpkhanG+PLnZTNuF86UWyOzwhymGx5gRSwoNDGrFii7hvIaEcOKCAZ70gWaqXCIhEUBwq6nBzq3fW6ocXnynFaHGoMMGkl8RCA/QDEc4HoBg1MI1RJoBKG9BjgvU2lWFVdue1EUm4FMFBP3VQRPbNgRmWbdelMYRoyG+1YPWVpLhrj+wUOzYugYpXh9yV0fXAzn

r03o7iFmO3OTjp7XkH8dbS6g4mCaB0Gp0FYM4CsOYOuaBw9RgxgQjeAnAopGcNvXuoENgshDEiqKSeCFXtxFNA8pmVSgH0RbedqyxRSPvXrwgDBnC2wYLX8bCoBUDSdlN2EHCKoVEZEMEQIEdXb6TDQ0swwfu10VjiNEgd4K2DqCYBegESXoFUBVCXAAh+ADYGwDSSYAKA5i7UO0QN5wrE4F4NoPUgMq+kvICAgA63Ebifq5xtSCuGCm+0kRlq1m

QcFb1L7idjWfvZA5uNjkJ6MFGBjI2kayMo6cjaO8GRjuZXdLsdafKhfcnhkl7rNbWDpV0CqOktNjde+KQ3sqREz1hSeYsOHoxIM75VEW7ozTJLnCH2djMgnhIZDFTH+dMxyoPzSFizyryl9ajKisBzIoeUeELZZ3lBzyJYIgTX4EYfuWmH1KBGw/RfLP44hJAdQDgIpCMBSYX+woAyEYGEw4gh87wTSAgETa+HhWaaVKGmjXl+7eUAyWVusG7CNw

fsiELVvONQT+08yNmAreidlVYn49aB3E+kZlEEm7u5S0GYQryPQ6SFxJkRnUrzlhsC5he6hZZrpME6bNHSmWXnRmEdk7Oxfchlq1CPiqXO/SDsx5pmyvAqMAx1KQKalP7qlV3c1nd3rmWha+9cLbnSVJWUr01lqLJDHhE3pCbQQVwXcM+W+FkSEqERULB8FghrziI3naCG+QsUfkDje/GrsxJOMWGddXqjAL4SaAGIVQHsPrsMGwD0A6g+gMGmkl

bAX5f53xt/QpKm7hHywv27yA2CDkc4011SMVTqxMmW9XgJEf2XdNNbrmLgIc/FmibMlIFlqc7ciFmLBMoHtxOJrTXiczPpnCTjk4Rvgf03m5yTxZvPWWbM0VmaTxe1pVQdrOg0zz3Sxs7pRTYRRLpWrSHpX01DwQm5vZZzR8H5PiD29nc0cyzrsYTmRDCgkY5KY7lsypDmg9ADlVgghR+RWUBKiohWG7zvItSdQxmz8JGIzEwob5OefK6q7FZJpg

0WadOPvLzj6AZQKMGLg8B9AbQMGvahfIJADIaSeCs4HujJAjI4hICzbJAuUjwjiKjBi3C9L3Twyk4z9Wtw+ADgywvKIsHxrFzeRITp0hzgDqrg+8I5GJngxWvQXkWMz2Cqi9md00knXJ2eogyypIMsWC92o9i1Wc4uPsGToNbAFUcLCkJCKTR1Qj1dXUEJSE7cBArjPITpSmd0yoLSpfFPTmrhs5uRfOfi7TGlzMiYEXhAIyWIr6Esf7ELEuDSpw

U54SNNgFdIEZAdbNHMQ5bzEKz6JLqxicca113mzjP9BAEJBgAShlAOIbAEZHZBgqTdFANoBfngrvBwrjuxSeEa+CziykTHAPW8EszIJ3IG6/7EAS+CZKJqjmkiFoS8zpXw5kmqq6KK3E1Dar2Biiw1bqvUXMdlS0k/kcYtGb1RhdGGV9ws0tL+1ZR7i4ozVH8WoaxfE8DdqVYirOzvkArdNc0LhQATieMQUtfksjnAtvRtnX3IlPiHNLkxhc3tZk

Oj6cINgjRNog5QZwiWE+ojDFGXnrzQcrGyNMeHlj2XN9F5t6zvqOOmn3ViI36xywQBNAEgPqL5TUGqIJBhMhwMGvgAvxCRvQBswC6/ptmTb6Nwg9yD7VOBs4vgElycRFG9Led1JacKYgVbzKbH+gKaFjsij/3wQTgZalI5xWTLVqXWdahHQ2pwNEn2rLV/1mSZzPEGub3anm0Xr6v82uLg1xRq606gVYx10ACdTwCnUg9kSpEPK2HXr1R5+FTchA

b8EKSDm5LXR5nV3t7m971Viy8LVhqvWHDb19Ee9b+qfVMQX1b6qKGXc8iUNI0GcYTo+v/XQjANwG0DcynA1shINXjaDVSC3akB4NiGjrdqBQ0gO0NYDv4thpgC4bUebln6x5Z/r9B4KvQe1E0BVC9AN9CdmyHRsRtixC42LIY0NiowYk5WEUYh0LHXNkwf8yZiA4JxbhBZCw5fYuOWFKhrjWDtd+1vXbU2utMDV3Om60OyPt3M99FvZuzax0lmij

/dys3zcoMDWPkijZ63xdNFNm579BwcH8yFnLCGw9o/IUOB41b2VbO9laxrbWta2h5w5ujRIF/BARUAEoGAJiEyDaBX52AEQE6G0BVBSA8AK9syFwBwBJAMAAANwAAdKMKwG5ioA0ksgVsA+nCccAIncALQEQGwCoBSp5gVANgDREZhUAhOWQO48CBQAInwACJ6gAqeoAlAhCVAJoExHhBUAAAXnOQc5anagZgKgAAAUegfQPoE4AZOogbIKkMQBC

eoAfAAoGAE+mJD5O0kfEL1AAEpynlTlJ5oDScDO9wWTpUA458chApwYNUIOzR4BFOH0nT69bU/qdCRsgEKyQE08ISLOOAlT1AGU4eePPKndTqcEGAyfVTinYNepx0+ad1BrAxAAwK2CED6AJ9pAaotkCYB7hiQ2gKF8Br+edP3n/1q5+oHmeJPXnlT4pyIAef7Owgx4UYNDDYBwZtAhOKUC+25idOwg7EB9L86nDMAMXVThQKgHxeHOO2gkKZ6QF

QCf8FAiwKMAQFQAChfHSzip1JAidSQe2FAD9t6qifKBHHzjqcPoDcfVTPHsAbx747gD+PyAQT0JxE/sfRPYncAeJ1AESfJPUnmz78Fk5yehAOnBTuAMc5KccBnnjz6p4kHOcMvbnyJtp7kC6c9O+nDznckM9IAjOxnwQHIJM+FDTO+IszhZ6K7GcWv0nmTpN1iG2eBBiYbL48I69Oc5APXqL7mOoFueJB7njzl11i7zefOaXPzv57c8BdsgQXYLi

F1C8tDkAr2pAeF3S6RcovLnBbyQBi/jePOcXpAPFwc8JfEvSX5L1N1S6reduGXTL6p5m54AcvfEXLnl3UD5fWAhAgr4VzAHjfiuOAkrpdmO1G0Hcj3xW0rbDCyQVad2e7YIIewVDHtT2rYm96SGa1pFWtLbpR+Oi61vt8AMrienK4VcuPlX7jtVzAA1d+O2AAT3V4k4NfyujXJrs1xwBWdrPk32T3J3a7EwOvvnD6Up/G7dcJA83/zlp4R80DtO/

XBgAN+s+DehvxnEb1dzG7mclvlnib9Z/VoGeUv5XOzjN6O6Oc4eoAObqAHm57fXOi3CQZjxU7LdYuUXlb/j/S4acAugXDb8F0wGbcwu23HbxFwy+RcXO0XfbzF+W6HcjuCXBs8d0BDJdsAKXQEal3J7+fzuWXi75d0J6jfcveX/Lrd/gCFc5ARXLzsVxK4G1DaRtGWjtqQFA6AYptonWbbB29soTOdCpI/ZUHBQGQqghAVWD4ZjXcghWiNzztq03

nfB6+xaih/bIrg0iZNoKLzm3PiMuhjw0S4KAOBgOXgEDEc6WFTexNpnruDd2tRpqEct3Cl6eos3RfzMGapHhRqk+ZoHsKP6yAtke4mGkPj2pCzZhzbTrDw8D2TK9tuE3ovA7Huwsl0x/wd3urX97J6htltZry2PZXDjpx8B5VceOX26rnx5B+g/BPYPgHq70q7JeCQkPKHy1xs/Sc2u8n9rx1wSBEBhAB0eH3z8y9Ze8fUABAIJzoiE/dOMP5geZ

2gGapdAYfbIXgC1XjdwAX29AYmGx6yfpvgXUDSZ9gF4ikBPn27OHxPqE/NOwnEAIyGDSqBjhRgwmaojUG9BiShI8FVsGkmvx1AJQfEXoJpBVBtUugkxdkQz4s9VAKfcG3ADAE6f9uknEP77ym9+8ce03uz/UPx8E+oBw3on5p4OAk9POB3lT6p2p9bcDs6PsAVANttQCNRgX+gIjxk7YBCvqwZPinwyCnDcu4A5gHEKgFHAO+lP+gM3xU5k+Bhg/

9b534p+j+guVPkL6F627hcIv5PzATpwb8LcAAqGXMr7D+oB8f3L5gJoFueWgKAjjqd8oDBpCAxQYCUgBn7095+Ifjzlz107OeEBbnCQUZx34AA8+vvT934ADUg/k36W/z+uuWXLRaVDLhd+hAMfqAVkKwF3Z5hA/ubzp0kHiAAA9Y8JsFH/lua/ub/H55+acgaoABIDgMeyYAWfbjOQY8J08d8GBqAgf1ADn8OBN/y3rz6p+f+PYds3f1gVf97ir

+DgAOzU+vELT7j+lTsX7aARkAAywYnTqAHw++QEf6oAAAKRdOB/lADzOCAbT7aAInuoCBgyvh/77u+fkZ4ZOOgJO6ceSvgZ5+eB7lK7/ucHkB7veoHnd7geD3lq5QeOrs976ur3oq6uOitF96seaHv96YehTvx7A+LACQrg+E/lD4meMPtAxgBD6H65I+2ACj6oAaPhj7EAWPrsA4+ePgT5oexPpwCcs2ThT5U+8gfD63ODPkz4s+bPhz5c+IcDz

58+AvkL4i+Yvk0AS+DYFL4QAMvnL4gOCvlQEROOPoIFWuKbpx6oA3HlODZuZzpn43ORvu8Am+Unp/4sulvgT42+kzvb4P+zvii4dOggO75MAnvlSDe+TAGM7++gfh04ZB+fhH5R+TvrW4h+8fk25J+sLu26p+SLtEEv+ufkh4f+hfmQGl+b/BX6ce1frX5MADfr27v+5bq356+Hfs05d+z/n37RBQ/iP75+CQR/7VOU/poGHAs/h07/+i/hewr+Z

zuv7aAW/jv4bAe/li4YBBfoK4n+agN/51aV/oTg3+UAHf4ZBT/h36v+owR/4VOX/pwA/+V7PP4KMQASQAgBZgeAHN+5blAEwBnMPAFAhD6EgGCuaAZ04YBWAVCFQAuAXp4EB1Aa87EBIIRU6kBUARQHWehAZU77uh7ishpaJ7kIJnuq7JyxlaV7r4iNa1Wve7oI9Wmewvu3IG+6lUH7g+zgO4jD+4cAPWq2x2OPAdd7MBXjmwHaugTlwGROl3rwH

Ku/AQEHIeQQRr7CB+Tlh5A+wgBIFg+zrvh4Oe0PrD4KBCPsIHI+qPs4Do+QLloE6BhAPj5TghPuk4GBpPsYFUgpgTT6KB9Poz7M+rPuz6c+3Prz78+n/M4Gi+4vpL7Sw0voTiy+VIPL6K+bwQm6rOP3ux5bO0TuEE6+tLgJ5RBenl65xB8bksHm+SQQ0FWhqQXb7CgVQQYAu+OQQgAe+9oeQDYAPvsUGMgpQYWGh+WIRW6R+GQTUFx+jbqp45hKf

rO7hAwwaJ6vBHQeW5dBxfj0Hl+VntzADB+AHX49h6Lv2FYu4we36d+3fqgCzBA/oH7D+Jwab4Nh0gasEz+WQTD6bBDztsHL+mgXsEb+PANv48Au/hAEVOZwcgGXBZ/l8E3B7bncHegt/jwD3+Ifs8FtBb/jOHvBnwRf51av/r8E3Q/wWAhqBSIVeFkB0AbAFsgkIU6FQAMIZ55whCIdgEPoKIb25oh+fpiEf+OIeQGWelfv4EQ+RIQF7/s4QGSEh

eYXnYQReM2jBya68HItobWKHBaYayHADwAUAt4NUR/sNtAQ5Tcw4nOw/AFwGCDe0bGozixQgJg7JGYvGkY4fAzvEOBJAVDCgRoqvwEHrk2fSGUg8OJ3OMide6mv9LN2sZEjr9eYjoN6s2BZgUbGapZgMKsWPVucy0K03so6JgGoCOq9Ki3sCjZW2jqrAuaK9iBLL2llAQjIWA2PNidG+3uY60yfRutbMy4xjSHS4AHlKFChqriwEQe7AU956ukoY

a5xOCTnKFq+1oeh62uyoaIFJhaflIEse0Yer7selQQmGOuafnr7duqYc07Fu+fo04AAfKgB1uTvnUHthLbo0GaelUdVEjBP4ZlFoecYfK6E4i7jp4fOkfjO5ae4QOuGNRMgYc5EuegBO54RlARNFp+yvsSHxa0rr1oMBb3q47Ch93pq5ihMHtwEOOCHulEq+/UcEHZRAPiqG2eDLoVEVOF0Rr5lR6bhEG3R3YWc49Rhvnc71RTUS1HKe9QR1Eaez

Qdp6fR04XKGPOj0bGGV+yoSNGVBK0XZ4/Rs0WO4LR5nniHTub0Yy6JO60YAikhwXokAUhJWlSGXuzbNe4Xs9IbVpAaT7nSGshlpC1o5Ad7J+5chYbDyF8hUUdtHShN3mB4JRh0RKEMBp0aa4ZRCoex5KhgPhjH3RUYah6XRz0dr4VRSLh9G6evbmJ7TRv0bUFthifoDGdhk0en6gx+nuDFFRksRr6DRMMbx6jRCALJ75RCMQ2EzRi7vNEkuqMUtH

We8MXO5YxxEcNqkRwXuNrhe02pJpRetEcfyq2cXpdAJeEgCHCaABkHxAGQEoM4BHOvhG0BdAQgC6a6k7wGDRrAPptl49EQWEDjywZcL7LDGC1K9KJq/RKDAl87cIgp1wHkGuIgG6kTDq9e9VvWp6RaeqI6qcuZgQZd2zVkxadWFkd1Ycqg9oo5MxhoomAbSEhCLYGiDzDAJlg5YG3TeRBYPjFcmnmuWDPMlwHsCBRrMsKbKq45kd7zKh9v3qneEx

jtZj8BtqBCeEZiEOCbKkTHTyqIAmpYiWImiCxQ1q7cByhGYrunyiqO4IrcqQiHtsrJe25hh6pMRD5glT4AmAAkA4gGwPE51AF+FAAbAXqMoBGAMUBKBpIzTGnGgWpMGHoWWJqmWBcaRXkAqXA9SFlBngP0HgkS4VXqgDXWy1LoS+WqsDJo7UiBnQzVWympWoNxSeviaNWRAlI4s2rVoQbNxPdl5KkGxRrzYUGU3sPZ2RECJEgjWECi3CwmE1siRs

GcKOsKqwIUD2DbA9OtvZBRneod6qqW8aepH2EUaPLaWGEhABTyFYPFRM0d1t4SmIWsGohksZEMohSy3HBEQ/4aGKDDXK+xu7aHGX8a5YxeEvPeaeWyGP0A4gwmCqA1A/QJEhg0t4DUDOATQHUDegbQCqAYc3phl6/Gfhi5BasXHLyj6syKM6TCRVIuCj7AF4CxSSRPYCSrEJIWCgrgGSmtTbii0dIzZN2KerXFM2bCZ0LGRw3t3YdWvdrwlyOvVp

N6AI9JsIl3Qd4I5EaORfJ9BvA+CUULdm+MheC8KjzJBYMOKeHt6rxB3hY6bxU5tvEzmw5nra7WspvtaVA8VDeR9ggqOzx+EpyqFjw0YgLqR9g5EC8BIQZiBPhQI+8ncpHynth4k/xPtig4yIKoEJASgCQDUC4AzgIpC/OwoLURGA1YsCKjAOIKnEJJ7+tl5DEQWOmg/4aaMiicmoZs5BXSSQJupMGruiHjfaS1EOBqS4ePDwLW70hTZIGdCRUkqa

jCfTb1xZ3PpFNxTkq2pNJDFi0kUmMjmN5sW1kVZo1mM3hAhkiAyQJafQxwBcBDG5MmJbJQ4nHLZbUWrOVbkQJjnwYLJwUaKahRVjqsmbW6yfvHoSFUugCqIe5mnCaSJcAjBoYzzH2CpUf2HZabGbmPBB2W0sJRz3JH8W4m2KX1nRHuWUvA+a9AzhocDVE4KmkjCgrYPQD8+TQEYDPkKoMoBeoMVng7P4SSUihuQTwGKpXAroMUKMi/WE8C/aNmKi

TdgeaKhZ5k3BpnGR6ketHoRyx4P/g1WZFsI7J0gjoeIUpIjm3ZcJuRgymSOTKR3FtJXVmQb8JpRkInV0oNGErDx6jnynnQc1NdJ5oUibDCQKc8VOzX0guCMpyqw5mvFjmylr3I4yfRNJHKpgYjokeMMptIZHxSGDPIRGFcMvI9gwIhEQhEFGIKiwQJENlx2WeEJcDfCJwLg57G78U6pXmJ8n7EIirLL7aVArYJKjDAB7KQDDA8FN6BbAY4FUBeo7

wOAmEA7KPEmxW/8kkl5Wt2j5AIwhFtnGWYeKqXaEUvKL8AVgl0t9qzJUgKJx4S1cVUklpNSVgZ1JTVngYFmrcWzb1pHNpSbc2Qwp0kCJ3SZym9JEnCNZUOdcplBQ8+CfaKB6UxCRDKJ8yQqqLJIUZrYH2WiTvGqp2qsPrbJEgGICzgTiW8IvknmLhA8o19IkBiA1UkAR9gAREogxQRpo8nuJJYt9a/xlhmfzxEzAISL2o0CdgBjgkgNURVAQkK2A

UA+AJpDCgnaRBnhp9Gm7ogEKUCMnRm1dpOJhQoWKbwIwbOFhD9yGrAthcOE4imaoGBZpkaEZPXhWn1JlGWRkSOTKslmjeNGdSbsp1ZrZHtpijD+xqOzCn0rAofIo3yLUUPLFCLq7BusIukjHMYjK2sqQJnyp9EGOoPmP4K4BwAkksMC7AQkJBxCQbABfh1AkIK2DDAxOr+pT2NslSDwaEAPRBSQe/GKZKpomWsm62aqTqpymEgPSA9g6EN2Cg4Si

EdYfYx4HZb6GZiEokIQgOCxo9g2AC7ZvxW+q4kPpGuvvqGZryc6k+JaSN6B8QVwCqAXglRGODYAmAG0DMA0dhfoUAddEgkJWQ4mJG+QKKkMQSJlmMJrasQsM/ZlIFwELCYZuSeZjrmGOSGbB0lVkUhhYAmqDCgKeGXFnde5adSmNxVaXSk1pHCW3GkZGWX3a0Z2Wf1b9xr4oE4jWfYN7ycaUtkuqRyE1oBJGOTwKJoNZrfKrbTpSlrIIaJKyUtkq

pK2RJmLmhtjIjLyu8qohHZUFklRX0rDqXwioliNBAUYCEMhBGI82Lplq6TyQZmOpyDi9k/0IkBQDOAVQOhAhwmAMkBpI/QJpDeg9APQDJAcAE0CaQ8duOpxWW0oApUiwBstRoMPYBjRkQ2UHDlmYKQFlBm8QsOTAFaK4qCD4WsUJjmp52OUSkBYeOQCbhYOecLLE5WZqTkk58og0mkCWdLTkDe0jsxZdxzaRN70ZYwrlnyQ1zL7lvcI8XML8p3nL

2QV808WGQeRPkTNh4JEaPNwypIuWY5qJSyZLmiGCEhpao8GyQfFbJCuZUBK5Shirm4YauX4T4s30NRjaIqXN5AKoSVAvpG5NqfenQi15iNK3mRmd4k/0t+FAD4QfEEIAOZ+gN6AwAGwD7kwAQkMySaQdmmDnbS0cSFD7A8sPAQxQf0PEqWYF0rkkOYBEEvGLpy4gHToCOOZJqxKBeSwk6RtSYlkkZleewmd2FGe3FUZLKZlnje8jvXmlyX7k3kdK

PYl2lFZzkQxQVgfYGbxVZrmn7JNyRmP2D7JFwCvFNZ4+UJmWOImWIbaJu8SPx6JGqRADPYWcKubUUV9F9iWI2OKryd4u4LgCvASYAZSWCbNPWa3pt2U5bvWLlmbn+xz2RxI+JyQDiAGQHERQBDAHhv0DCYWwEEJeo2AF0D0ATQO+I/5geX/k/ANIpcCoZgxFknNIgJkmigKlrKJawFgnIhDxAeaHOoxoCZtQm45hcPjkxFwxkWnteBGUXmF5Jecl

lYFZAhXmGRVeZ3GUKhBXRmtppBSIQdKmSJQULemjucgFpFwBrDjJjBcpFre/eQWBRQrRhXAj5jOqLmCZd9K1k+J9qNUTGQhIq2BjggTrAn2oxACHDJAzAAkD0AE+kKBhpECFA5UAs2fNmKpvBdPk62s+atmSZi+RAh6IyEI0jFQgpK3B70LGpLBQQd1u3BAEYRDlDWpL1gfLGG92XvrL4F+XoXOK6ALsDVE9AHADKAUNrgBsAY4E0AQM+gCqCRCy

gPQBwqPxlCmgWfzHhR0O4eBoyxQYBXGjJKF0uCgAC+NsQkwGlcUZIkWNNsWnEZSRSgVlKuBSllDejKYSX057SYzkjCOWW2lkFoNMnTzeTkWUUIQwWSHgQoIqTLiZC3kfmyXgVokgR9Mk6ZpZi5e9pPlqWgcctlrFcuYfGIYMiC3ARQB7LFSRoATMcBlgd1sRB6pHwPdCoQ/QIojGKLeAoXG5zlqbk3mT2S+lvJlQKMAX4GwKQBdA7+QCUwAbQLxK

aANQMkAhw9AOfqsCThfCpAK2UPUiRo1gs7rSwU8WUABQGNKFDKs3mr2Qfa32jsDuQlySxw3WbnBJpZ50RXnmxFyBdUl4l6ZSkWElaReXk4FdOWZGyOFJbSbM5zAh0pCAVRrgy06GXBVnJGI6QdxPAxQuChCKo+aomKWQpceqaJfBWJmy5Q+vLkbpMiAzzww3UicDEAXkCMkwQUqK8CYQBGJygACV6ZKgM81wPqVaFhpefnGlXia+kSAMAF1RQeFA

HDZVAEoO8BwAbQP4LwU9qEYC4AikLQYel//OeDQCFycJrFwf+pZjFC2rDkkpQvpHmjqsd0smhzWTGgYqbCwxuibZ5hOQTkhYEWFiWVJxebsSUWmZQSWkZOZcqKFmmRWSVNpfCXXn5FLOdcz0AVRtegkQ9vKt4wknZiirU6XmnhIbe/JVMpcFCqcJnHeKxfwXiZvZZKURUEgHumGJpUBDytwX2IkCco0EEmB6IasG3hHASEKzgKF12eoVu2mhZ/H2

p38Y8UmlluTIg1AHAGki+AsFAgkbA9AGOCaQhADABpIGwGDQ8AMAOl5uZv/PRpUYKaIDpas7CvBAFa67MYhFwK1AHq06LcN9oleAeo2XDMcMKUnJloFamWQV5KeTlMJsFYkVZlCFY0k05eZZXmoVNeehVEFmFaWWg0cWg2bdpotqwpngoxH2QVZ3eXUX5sJSE+SslO6i2Vyp1FdlI8FdFeparFEgnPnqpAuqxiUYU1GnDLyFYGogvYmXC+R4AwIj

UZGKJ5Iqi7gy5dJWPKDqboXyV+hatpKIQSeRzwUmkKMDDAvQF6hmQgIBaHhJCNhCX9gEZjJahGBcFFlBlZWpQwwc4qF5risqUhqzp2qdiXB/4iBAIKJlGBCBXgVKZXEX0JtNriWoFRGegWsJqReFXYFJkSN4FlrKVZGUlJZTyqg0EKYVmlFQycCiRSxYLxx95cJLWWclcPIqaZQYOhwVCm7RS1kX2PiWg4GQFAFABumwmPoBQAF+MrBsAP6ZoBpI

YNMwC3M42WCVTZKWrNkaonRT/TPmQgMMCmFXQMMBCANTMJgwBRgL0CTsTQBJjTFfuTZC018xUxBzZ0IgtnLFFVQxU9lCigvn9lS+SzRIQCPOHBj4Whn7IHsZElcCj4GEKghaw7KFdm9g/VXamDVsleuXjSm5TaSKQF+L+ZCQXQPhwwAfEMoDCgY4MMC4AHNfgAXhK1eDk5CxSGqyRmocpZh8igJtLDZQTlVEZlxvaL2CoCEcteipS8RbFnJFMFQz

YhV8FZgWfV6RZFUoVv1QQVspANUPYFFA8RAj3AvKalXnQZcNXqNeg6eyXVFzRjNjX0wBdMQo185D0bcFyyVPky13ZeKVMVCtVKU7Jc+kQhPAgsjhBEYihq3CwQ0UBohTyV9MCI4Y3wr4R3J1xQ8km5+mUaXm5l+VbUQANQMQCAJdQF0CjAFADiBgukSKIDKAfNTuAwAuxhNmQZZleRD1I2VqDBKsuVsHU5x8QAOBN8mdmnBxm5cdFApoDYCRAmS3

THZQIFSZXby+V91WmVp1icrpGBVfXrSm0WRJbWlpZpJbnUM5WWQXV9xCVYoyIJJRQyXg1iaaVbN1bJamj2i0sJzhskLRYKat1IpujVMQD5sJh/mrYLsA1ApAEYBeoh+JgA2FFAKMA8ATmWkjGiGNTTVzFM2eLWLFtFZ2X0V3dVVXrFfZf3UXGGXOnDylr2MeBgIo9QYjaIoWaoh4QysF8Cg4hYKrAm1dxUNXPpG5aaUSA/QL0DwU8FMMD+EowEJB

8Qx5XjW8SKoEoaVyN5fbIBGldWTANIoWFgky4A6fUgsklDXAL/6xCQ0h28RlG8DkQnwGTagNN1T5V3VvlQ9VkpDCXA11xsDTdwU5NFq9yIVbktWnMp1eTkX51xZYXVYVKMoDg3preSlWjxxfILnCaB6GyWQCTciXC/4TwNlVzJjWajXyppVR3UilhUuFECFuiWuk6WEAFPWLyE+HhKCRX2A0jIIasLojkQ29NRimIz5LxxGNp+Y+mPZG9U8VocP+

PagHpBkDpDNiCACHB1AQkFqyna+AGjIeNg4q3BuQ5qkCL4UF1pZgUwt2tlRSykAniqEqM4jmk5peaYgUFVqxI9U4lb1S9UJZ6TUlnZlmdbmXfV6WWg3klGDaU1YNQNT7iA4D0GXW1NDmjZivA41hVlxNRFT2bbQTZYqaLYlFctYlVR6qFySNXdWKUyNEpX3UsVmEnrl3W3mN5h4APNNyRkS5EHvQKoeAMOXsomEJ8DrNDEmfn2KclWY0KVlQHUCN

E4STEnQJBkJBy44QkJIBwA9ABQBpIQPDc1Ui5mO5A5QEiY5rXoT2icnPAX+DeSflGaeXEDgurUyXO2aQldUqRGBJGgpAgdMKpaEwsFA3PVKdVSlZNrdjk0dCZeUhWmRnNjwloVHSUzllN2DZUCA4S9aDX4N7AiTDUU4rAJpZVfOXDwCKgDVQ4t1VjIIbt1wpflKilMuT3Xy166fI2CweqfvTyoGYkapAopcFlyXgu4IYn1V3NMRBTynYMfmXmGzQ

9kPFFtW8qStFjfBTY1uNbgD41hNcTWk15NZTU20otfRr8ig8AMooWMJva07VsMDq0XA1FMlJO8xCSqyJqXwPAQVgSiRVaSaw4u7wmSyKj/qe60WaRYJFqmjWraRXrZk0tCkLWFUBt+TVTmFN2ReWb/VSLYIlF1r4udn10k9j8Yz20wNOoYypOjXrsKgZQS34yCiQY79gYqqJpZtoijm00VZVdS0Fty6UM3agl6teobg59vQ0Pqf6jfYaod6tu2+k

ztPu2NN9Dc4DHtpcQgQxQ57ckDv2DEp/b/2YGgaIQa39sBBoAk9hkAMISGKHa4AE1SHBTVM1XNULVhAEtVjc9EBAB9OYCPMC8gAIdMVNqmAHmBeop9tLh3qFFAY0bcoMIKpXAJFI+r4WYOjUgpSjmg2DMd7EhdiwacxTA6/2xAKhroaSGrMXTZ/wEECLgFAMOZIOm9eY3oAjDa2DMNrDew2cN3Dbw38NgjSZV3QIjYjbYyyGayTlgUUBGiHck4me

DbA9SPbytyOUNtzEJoKGQnBQuXKghVwkRZJrZQcQPLB6ST5AZRhNl7diXXtEgFpECOzCXBV4KpeS5JfVzSag3BtFCp+09xXSQ3nUlhRZpSA466Bi2Ad09rPYENchD2BT1NDhxlwldZWgBGOCPOxlktbRT02UtpwlLldltLarY4dZ9kxBadV9s+okdF9rl0t4DGmnDXoJycnilA+cGV0o53muziIQTHTfYAaMGl/ZQaHHX/Zcd3ALx3Z4SGDvV71B

9UfUn1Z9RfXEAV9cp1ydscIp3ydGqCp1qdGnY5b3qRcC14hQJ4J7xsKycNCRGdfzNlBvA90ngn/ohwJZ2gdn9o512dX3Q522dGGomDRd7oO51oaXnZ4mW1vnSnRg0rYMEB1Aw7lxFZeoFicmGYrkGPjIEA9MimoAiEH/X9gAJn6VeazvBap5C03c9hgCjwJXGkpbXknUx0DXfFlk5PrfA2U5iDXk1tWBTQ2khtMVWG2YNP7eU1DdtSLhWZw8JFEZ

zdK6rDxrqYUGHkzcSHR3ptl6iR2VbdleMfYkx/IW7DYgU4JWEOOE0RE6mhmIMSADsPwWhAROnbAeHIewfdVJCe8fW77VghAMKCTOV7HiAHhcrhE5EAmgOQC+OdAb1q4+YmCn1h9/HhH2Y+UfYECARcfTkCQgifeX0h9qfTkDp9TAJn3Z9eoHn1AQBfYQBF9VIKXUkhOQOlry2BMRe7i9kUdTHoAd7hTFMhz7mTE0xCoHoD0xbWkXXEgr7LyF/uZf

cn2h90TuH28htfW24x9bvo30J9C/kn0V9lYagBp9Bfl31Z9v/rn0L++fVAyD9xfSP0jwgXu7FjaoXktoQckXjRFbNw1azIYdwcbpYqgX+WOAtwVQGkhVwWOFUC9ANmb0BGQRgHypat4RgMyCRxcQCaVeYvcLhxAvJhAqLcgosQnrqKCgnXAtdXRC3a90FS10fVL7Ub1vtJvd12WRvXcQWl69Cqi1asFZR8BZqARXUWw1DBfXWagDBniqEpvBkVWc

FXvRPk+9ndRh3WOctUIW1VyBK6Cg49IAzwJUxiMcBDlPKLyWjlveIWCWIZ1l8DCtH1qK1Ppasn/E+JzNazUUA7NZzWRI3NXAC81/NYLW9i07TF3ZQtmD7RpCJVvo4pdF4HJHwC2jr/qRoeaoA15CpcVupYQ2XQ63Iks2k0iA63TCAYFaidakaa9/DnQPJ1DA1C1MDnCSwN4FRTT1146T4gN3F16AOqYAdMnUB0Td8bRDVzYLXiA3QdrmlOSjKzmh

zjYQHvQpbq2ubfIP9Ng8oM3Dme3TeoHdF9oR3X2QvK+oX2guKXZtwMQ0gRxDXSLd1aI8QMkOhYqQ/8yWdLGKx0/d9nWx0/2TzjJ18dAoAJ3jV/QJNXTVs1fNWSAi1fQDLV8PdD0KdwAcp2igqncQDqd16sj1JAxiFRRIEDsjhhMFEw03DldYBM6RUYMUKT3OENnaA6099nRT3wjUXa50M9+AB53M9LySNXPFvuEJDCYxHNgAGQvFjMWzwfPQlavA

yeSijAFFdt5AXIdlcw4qw21DNzY932rkJW87pH2aq9ukvwpUYJEPV7wF5Ser2ZDHXtkMZl0DbSqMDbXVnWwtnXdRnoNuReG3ItZehU0nAVRt5DzYeVjDVGMMiaINCC3IlLJZ2hVa0Vj5sg/0NUtvvSdgrpbRL1rSocGM9qoAg/hsADOCALTEbR/7jaMOOmwPaOOjLji6M4xY/WRGuFa8gdI/AfHLkqj9ImJSHrsM/SyFz9NWg+51aVMTGPQAbIW4

gch7Wn8Rb93Wrv2B9vuKhAejjow6NOjvo0iA/9gHH/0URs9FRE+xwA923bNsXsto2DP9N0W9Fx+AMWuDuwMMWjF4xZMWuswjSiPg5vJjGWW8QlkghQdABCCB+y2WpnbkQPYGyaQAGrLl0+DoWGXwukqSqr2AmEJtNRQ1MaOJwZDddlkO3tjXcFWeteQ8+2SjMLR135lXXSZqhtRZRxYRtKLVG0JEo3bUPjdIHYyWhZKsNsDc5MHfi0MAzvZ5o0OD

cDkI9Datih29NebRzoDNYxlh1lAow3h3jDBHUd3Ed+HUxCLj2LfhUDKJ4NtXTAmwNejQGLHORBeYs2DsMwjH3QA5U9hw9x3HDTEBgD/dMiIYXGFQgKYUJA5hZYXWFthfYWOFMnc8PaYsPXaTpkHw18M0gr1kZ2gCIeNeSoI0sAT1FJBHUXDRmQsFsLo9JEFhC7A0IyIiwj0DkiPHYkDnCPOdyIylpudaI0z2aW3nTs1n8V2WDTVE1RP0BVAahTfW

CsrbIQ57AFFKUgiWoMGCAXty7fXBg6M7KEOgwBlM7w/4pduVbkNWEJziNea4rUUCjqZhr3Cjh4zkP4lp4xnUFDGRcb3FDH7ewNlDNkRUN/tCQMZXJVVBR+MvMs2HXXAwqXU3L9G/zFQ1Tp7RRBMDD+bf73fGvWpCD19nnTD719NyhwAcADjtM4CgXfdE70gsgQtEIA8fc30w+ADKgD2QgMQ04592QDX2aB7U/1PcuagOgBmgCWjmOtTA7O1P8gGT

ngDdTvU9y7LTDjkNPsuI02NPZAE03ABTTOYbNO99C06gBLTOQEUGrTqWv6N4xdyFG7LskY9SEB9W7EmPz98Y5TENaSY1ezFjrGGmOb9LMdmNRRW049MDsu011M9T0Tn1PPToQadPHg2TiS6jTTfZdOBO109NPqed07n0PTT01WGvT5UKWNkRnsZRHexfSL7EgDpjTXjgDjY9KVVAzAMQBdA1Ul/3EjkWk5P89pCemm8oXwGw4bi3kxJhnSAxjBbQ

ZG3HmroZaUNwICKGjDwbGsEss63FwO3igS8lIuHuO8OB443aijJ4+KP5D544G0/V14+ZHFNX7feOKj3A0+MQ0GLe3nnQcEIhAIQhFf+M85akQt0ms3nDAKooq3caN9DqHX02NTlozMC9awrvaAwAT/mR5QAa/Zf7cuh4ZaDHhCzOQCbROY5HNwA0cz67xzj4Vf1L+yc6v7R8uMbRDwQLOBly9gLBfNjxDfoxGOExUY39Oz9+7AyE4Ii/U3Ngzq/Z

DP9xmY7+7/umc9nOxzuc0BpFBSc7sELMg2iRFljwHP/1exQAyrMs9AA8hwQDEAMJhyYwwD6gwAiiPajYAXqLgD2ovqoQDOAwmCHDSGYJfFa/5/A9qxV2y4+CgDptIwdy6Sqk/MQRQ7cGWCJ5hVsWwJDx6FUKpNT1aC33taBbQPvVJs2DIRV0o1eOyjCLfKMW9DGY3mDdPA6Dl4NgyQ0MHcRmLXJLCbJRapN6JwA0i6soE4KXe9ZowoPQTJ3oxXFt

ozVBCg4GYm8DlgaiL2B6IPUrEzr22goKSLyiiA0jk65g9oXr1oA6z19t6APoBpIEoF6jMAwmDrQaVFAE44a0NQACq+QydGfMB5npdNx9Ek1HNQywoIPfODi0ZWkIc5TQ0/HDG4WaFgoK7Bf5VpNuvRk2AL5i0+0pTps6+2IN0VVbMcD8VY+MbZWtKqM4tvGkvZCDuo6MpV2GizwZDmApXVMbdPeuVWKDww8oMjN+iWojal3TBeAtV2PSFC+Ed1mA

gIQWpYEwyqneMqyBMXC6uVitPbcvPPmiQEEDaVowGDQJAJpNgDbzUACJ2pePtRfNqsRcMJVPlHIj/hZJrOCEUGUTzI5riagRa5j31SKEm32Y3YDhaVWJKa16xTQo2KPw6li4+0YFmRYb2FD9i/C23jiLTbOW9kba4tU1SCz2kHcSJk0giDVfHyXw1NWeVZMaovYtZdNNDevGzpkE9ray1RbSoPrZ6AEV3dSUEOWAfQy8uySb0ciGRAd4eYNVIryl

vOizUYysLktr1a5XWMSto1TIiYAMANgDAlu4EYAGQYNM4A41F+HZNQeKoHUA2cmA1Bbasm6uSOB0rJP41/Qu0tRSgGsJk5jGSvYCzhGU6krM3qIXDiQy1Iug/HWzUkyaYt/zQC2C069cy8AtnjoC+10klEC/gVyjJTesuwLuUwCSA44GYVNg1KCzaADKwBV5HeL/SKm3rCqKvPwxQfGVcvZtbdcHN3LDEUoOPLUS8IWlICmfums4IQIEycoW6ldm

g4HeMySLyGpsiaugDqnekdtIrZs21jvC720wrlQGwDEcF+PgDPmKoL+mw2CQMoAQMQgEL64AOFZgPw8pdkniUr39SqyWYECvsC7tW3vl4kV4TQaPxNsNT/OCj+4813SiqdUbPI6frXHxCrUo5eNRVKy2b13jvcRssuLVQwkC4rOy+XVbUKUCAZhyaqz+rez5cJeAZJzZUaOtlQc/VNELgw6MakLkS/rYMtnhPzSb0QsL4Sd4pqfSBKG90EYgHsVi

ESyiClohL2hpElY5a3FnbfcWZEmI9CvYjV9Kz6KQaSMkCEA8FACVGAEsOWBNAIcMJgwAINbzPnzzhfDxisQRFJHkjMUJZilgjcEV3ASBrEniZKZ4CkLeQDnCYzUUxi7QkTLMWVMuVrZafQPGzgq3mbINWcjKNirUCxKstrUq7+0yr3yVUYXJ3+NlZQ8Y4+Kk2gF5EKr+zho9Q36rIplOubdxC0MMwTZC08tSZd0GhhM0YIJhiQCrcH9jvAaLYEwc

oYaNj0H5Mm7OBZc4KzJXPJ4rXwsBrEgEGse1BkCHA4gna5F18zydInCWi0SokBPSP+I3ywWmWsw5T1ycAMrNFSKYw6uYcG0xq+Q61POyolX87wBq9ky6WuaRIo7yvYbVa8zbQtZs3C0WzhZWsukb/XeRvKjBfI7MsK3ZFRQBlFYFDwUVJy55ociBQq3DC5468VUmjhqw1Mc6TU1aM5j7Mdd6IegscVFZRRseOHEARrkZB/skgL0Avs1LtDGjgzAK

BykAT/kbEMgegKyBQAPW9DEYzfHkmH3OCQV0GTBqACqAd4vQCexEA6ri1v4AtsWAinOGYF1sEhFTl0G4AtzjNuaAc22KBeOS2ytsIAnTn1tLgmAT+GkBAACQM+WHhPOSAigJEBYeCgMACEAUkMgDAAuAFJAAA/BNGNOwACNuOuUkAABkHW11sA772wz4ux60+nNsxgoe96Vb50ULGWuoQXVsNbTWy1uEAbW6EHg7TAENuhB52wNsE7J07x6Ou42/

G6Tbu27NvzbR26QDLb47qdt47pAJtvnB3LjtvNOe2wdsLb4HsduM7Z28hAXbkYTdt3bsgA9tPbV7LICvb7259vfbf2/x4A7QO/x6g7zO5DviuEADDvhj4/ae7hj57kTHT9jcwDNxjjIYmPL9s8CmMQz6/YzEZj0M/QEI7rjkjvmu1WwNHQx6O7ICNb6gFjs47Djszsk70TkTs5Afu/K5K7Y2+LFU7nOzTuHbi2/Tsnba251tMArO9tvU7+27TvR7

DOyNMC7/WzkDC7D6Li6oAt25chi7TWxLsvbb2x9tfbv2/9uA7ZO8rtg7620wBq70O/56Uzk89TMzztM3PPReV68zMNjxmRrLtZzo11k9ZfWQNlDZCACNljZkKV4MQlmw4PBgEa1YAVMr/mdHkQKyFr+j4DTm72gmb5SObwIwvZBcuZ50uFlAponmM9ieYjRSk0lres/FMGzgW7kM4bNi7WsXjIqw2sRbf1U4vlDsW9b3ulXazRORdwHY1wzqi3cG

b90y8WyUuV3s5wZCawsrt56ryHQaucboS+h0kLfvWHP/gGnQhPTAh3RMPHdqE7hPb7OSV8B77lok4JgAzgMfs52AAjZhXAF+6RMaT5E+x1/d+NEhimZ5mZZnWZtmfZmOZzma5nagvEzaT8Tbw4QBCTSPaJMo9rK4l2lw0af6VX2RcMuMxQXpOyN/CzqlVz1DZQJx2fdqjO92Ij+kzpNsgOhwOX09EDsZOedpkwvPLzXQNfyc9kHL0DJemAABmX4+

zmODKAkSAVPC17mYQ6xNQWNRRvA2wAl2aLU6E+Us4cAmiQb2HTaLiZp7+L825pzK2htXtcU9MtYb9+8FutdT+2FuEbJQ1lMlGn+1b08DUwr/tOzNBW5s3oUPGFCSWacBZZpL+C8EsbxRq0ukmrdLb3UltjLRABIEqhWogSwUhX4T0g68kEzry0RBHnT6DPPdAWqbZO213Z56yY3WDfeww0atJNcwCKQzgLIAmymkLUDe5QkLgBNU9S84XZWYrAJp

Q5Uk5cAJpaAFJZpQg4NgxQkS+30vR10sEXA1GkZg3xzj2GVEXgNSTeBWX7vm9fuJHTXdMsGR6U0g1gL9aznVv7eddbPRbJBbkdPjEXfKtxtn4vXBrtJ5KqutDUeJysZbM2AXAjr1fNUfrdtR0Vv3L0jarbVVa2QJusYJNhPjwQzJFLCjE83IWDGKMEExofQV9PKhYSRYPZM3KGhWeverXbZetqb/q9iP+MWwK2AqguAFUDbzbAF0AhwCAPaj2ozA

JgBkQPPXivIockeRBbCJECTJPa8EK4XhYTtjqm0bxSXhbRHEev81Z5cR7V0JHmGz8eVrfx0UMAnwq3WkZHmU93HZTHKXAuVDXhAkDcTsbcgtwn9vArZUdaq3+MMbvAOKx7AGs9icUtuJ9Ov5tKBxaOwT0pguvNHnhO3DEYq5hzn8R6EEJaEQSVIvq4YSiIqhSoPgyJrKbZtapsFLrM5UBPAmgKkigZYx5CncRZI2GhNLbR2mnrctldtAlgcBCZK+

QjwAsME2MHLAT/YhrE14+xCECHkfAHOKmgAmNczFPobfmze237AC69U8r6dQsuhbdi69wOLpQ9kc5TX+zwMwqBR4lt7UMquDw11pLWiezqaGWXxeTnTdIPdNEZ7ct4nDR6rbneEAAACE756X05j756+dvTx7sF7FgMZYLS9g8iS9ricX03XNT95WrSFG7Lc7wJtzoMxbtr9UQBv3dztu71rfnrsUF7ljAA1WP0zNYzyc9tDEcvMlwRgCzW7gtZwZ

v1nv+TEPOtqJL6Uzjxx19ALYiav8wDK34z/Uh6TOBZXVT8eQifMrPm7OdfH8511537SUw/urnqU9nX/Hm51kctpOR5svtr1zQefFZ/WBtwSyP465qbGvCumhec7s4EtUVBW4geTmCgyVvhzZW4B7wU5gNiCCAh7NAEUgJrgSCBA0AU1tb9F5SeycAL3g46WXpsDZfIhRkPZcPojlwgDaA8FPQDYAnl9E7eX1l9trIhRLieywAwmC8gUAxIDiBBXE

V/B5pRAsSr75AHu5ICuXCAIGBO7azkqHwUs4Of66g4oEUFoA5V9iCVXpAOLG4+FoQT62hRgeCFjgmgOVecuF+GhDohjV5aEDsLV5M7egvQGECkAnVyu4NMo1+NdZXEMboFWhg16gCeGe4LgBeo+/W26oAF+K30p9xIH1GsepVyKejstV8ED1+bVx1ejsnLmhBP+w11NfnXK7r+BMA011dcDFUQKtc397lxwCvXZgHX6oAxAHADxB+ft1cl+zTj1c

A3912Ne3XdPq/0PXEN+iGPOm12tfTOwN3AAau2vq9dt9xIJ04M++gLODOAE0U4YbADPqztYRlTvkA1AMgHAAIuhV6r6seoQDADQw+TqEA4gPft6BGQofZwAAc0YFABNRRLkddK+GYfn5dBYN7c6TX0N89O+ImnlUAiALUCNdDB9nhdBAoHTr6BP+owIsBigCgDLfDu7uALdUgpQfHvcuLofBRGVADE3sq+ywSy7HBYQS9EDsE0V04wAaoagBZA6g

CS7rhg4fx63O5Ubr6Rh0gTwDzOFftH1jObhF85Jhq/qgBjgYNOgFyAdWj1tAQwQAHeJzo1y7c63HAGhq3Oz1wgB2GWQNoBzb2AO2AUAsN5U5dByLLc6UAd7EJ6A32gF6huE+1zzeEg+AFWxuOMdwgCP6E4LOCc3/l3TfYAnTpgBNOTUZgBZ3o176BNOzTmDfaAvoF7eVOmfV05F3jTs06XQ64ZmFYu09/Lfl+ld6FTV3HAEdcMIEEQvfvBGt4PfD

3o16PfEA1ABBGPOaNyn15gjrsLdbXlYXC7n3lYTZ5jbJ95uHluCYcQDZ3pfmhrP37weW6jAmAH76BAzAB/ez3aGtAGoQll1GDaeGcOuGPOUkPndYu5d6vdwY695vf4wYD8QCdOyLKzuwP+fkEBhAiwRBHIsFd2teX3bt807w3b13fdrXj98U7YP5bkQ9v3wDxdBoa8D685EPf9wA/hATD8ncUA6DxA9/s3YdA+sPEMW4TeOHYFLfZA2AIDZRA+gN

dPNOHESQDaA8ThQAKPGD/M4Weo4coAERRAXrFYuJd6tPl3EoPGv4gvENzDhA7d9DAER+ftU7JAvt3Vt2+Re4W6eOtt/beO3eV8QCJ3icy+y3Obu3AC5XXu77tQ37bird3sj4EHe0PP4dIFv+zUbnvDuBfoQC9B0PZ56dO7noK54gkzswB5XbETHN/szD0J6XqLjpoH1onjwX4x+y96gAoPtdwi6aQ9YR/473jzt6D17+t7rddb39z/dqBguwNutg

7uLc4j3IT2KBtPP9wZDg3YCFju9PL7IM/vB8FJu4EAkp5M7NOR/UQGRP2LrE8PO2lW/ydO9APoBE3ujwGBk3sgOp2YgVN4875AmkAQAkAxMEZA5AhAKJikA9kL46E4ufcc/6xWTrTf03fEIzfM3rN+9cc3IQtzcb3td506VP4oIc9QANT6U//XDYYLejXwt2DfTXEtxI85AGt9o8DhSdynfNOadxnfBX2d7nfLPW2zrdL3+j2XdoQFd1XezgNd+K

D1347LgTN39PG3fMAHd13c93qAH3d73mgTPdBPR93Q8VOk95g+B3HL5dCoAAAD5CvAd6FTaAHD4QCAPH9z34gPFAPPcQR8FNjPDQxMHw/KvowFA71+DPgz5P+DPhS913AoEK7/3Ur3mDaAMT6GDhANzp2xjOSwBoEhekztEAMx2gITfCPKzz+BxP6zxQCY3EAPq86vMPhQCl3MTwNy1++r9U/6A8IQndy3kINAxFBE+rFqYRuz486u3wd+Q833Gn

r0DX9bfXy/iv99/uDk7eL5D4Z9T/edNQvOt5LtyP5T/a6dONsWZ7cwFnpVETR8zty9s7dvgH7NO5b9oCemL7Fn1VvWz2I9gIP22S4vs4b77c/bP23f0QAfr8IBl3T/mX6oAXb5n2ns712qD1uXr7j6lh7AL+Cp8T6H+wiACADaBNvBb7y+vnuIAq8v3FTkq9gIKr1OBqvV7xq/Yg9fryFZA22ps/KuBIGAjzOurxAAvhR/iQBYzYCM68QAzb4O6r

P87wk9everwC/igfr0S9BvNfhOGhvD6DU8RvCe82/E3WLtU5GPjADD6h92HzbedOYCGYBiA64eXca3jrswDoPnTnO9kf1fQ2H1PlTmy+9Ph90rcQR3T+2wLPlfqPfMAoLuKCP6KoJIBqA+oA6CnbfbxOBEf4++7ijvE77lcCgS78SAM+qAGgCifG72IBsfwV3xDDvSvpM8f+ub6Q8pvG12m9UPb1zQ8Pon7xBGNP3zxaEDs7b//2YR49x8GT+mQG

wDYfRd9kCoPOQADckvSD0BDAvBr+uDaALRH06MA2b3Bj2f/r4G+GPxj6GFmPzABY+d3YX6QEtEjgIECVhhOJZ+cAVH+7gvv+rxKBCAVUhmCHve7rs+k35N5TeBB1Wyzds3WHOECc3qADl95fYgBmBK+zL569WPEPisEd48H5oHWv1RKMB8Q87/BSu+g7Nb62v+0w74IA3sLBhFBHKFWFeoQi/19MAD78wBahXTu1OEzVvjD5PogDzc423g/nb7Vg

ZRIJ9ivoX+aH9Xe4R3cM3zAEze+fYb79GdfIb1B/4AYb506S3IDgKAa3QT5C+dBOt8zsWBEAIbfghJt999F+ZD5bcyxntwW9dBPD6nfEwWL1ndxzuL9re++/L+F8GPXn2S83Mj31S+N3tL63chCcX0y8zRrLwPfsvB91f5j3rD7y/T3s9w+Bnv7T8d8OOs970Hef3ML59b357xuH0/jzox9k/7bix8c/Z9yQ/EAV96m8I37brm8mfmAdp/tPjD3H

Of3FANL8/3kr9K9y/cr3w9xgAj+n7QPEEXA8QRiDxj/6v9d2DYYPWD6w/7uH/ng84zdT4Q+iPun8L+g/FD+jfi/1D42+uvD0aI+y/6TnK9u/DP3W/K/XD6r/MPvD8b/8PUD+J4+/DD+I9vf0MNI+nQFb6o9KPb/Ko9K+Gj/hFofib5U6wfkX4wDRf9kLF8Mvljwl+gfc7zd9IftT+W70fFTo0963tzr7sQRrN1ntQAan0x9X+/T4+AQRwz++8IAY

zyf5dfGO57utbgT30+q3YT42+K/rztM8CuVtAgDzP4T7h4Nhuv4RG7P1Tj4AMgCAHlcThgMIBGZAcPmWOoAdt0IByBxPpM68Q2H52zl/D0XNfW30MR7dJhzXzNHqA8GuU/tgUAN6CyP2eHmB/3YgFq61gKL5f9NXVoVq2ff3d2mO1a2RsUCevW06ege018h/X48vtwf+/ihTuc7xf+b/3GcDCE/+OAGdG71wIi2MWDYG03h2XlysubAF8udl2Ncg

V2j6zlyduL7DcutYHSuFTyIBJAP8uZAPvCTl1Cu4V2OikVwYBMVwle1zwSuSVxSuaVw4BGV2YBSHhyuLl2oBBVyKu1rgw8FTzKuh11ruVVzCC8gLquDVyv+432lQhgUmcp12muG1xBuqvjUBC12uuot03YG1zheMN1O+zVww0mgMWuz1xWuYvwM+Yv12u1W32uNVwUBJ1wAY7Vx0Bl10WuGtx0BZgLFug2xsBy11zetYE+uAIW5cv1y++5bkButz

j0BH/hFu4NwCBLf0SBm7FYejv22uzT1+uKN2JgubwxuWNxxueN3oABNyA+6IXQ+ez1K+D6GeeD0RpuBf3ScHzyu+Xzyq+vzy5udX0e+fNwh8O92heRQXIe/gM3YCL2j+UAGRect0tAeYEVux9zq+I/3Vuo1yfeVv1ReK0yaef3wB+xtw12Gfwc+5yF9uCYTn+CPgP+3LjceztyR+WwPduVt2zcYXzdcvtylA/tyLuNtzjAod3Du8IUjuQGmjuuBD

jun3wOB0PwxesPwWA2LwR+LDwOBhLwDeaPx0ALP2UAbPzQe1LyiwuP0G0+P1qBhP17u/d05CQ905eFP1WBgfgLCIX0Z+NP3FAdP3aeS9znewINBBHnw5+lf1ecPPyRBx91PulTjt+IvwcBlD2d+xnzH+FIIqcnv3l+4/w/8/vyAegfx4e6v0gegj3E8Ovx9++vzXu5Lyx+aD2N+6IO5g6fwbClvwIeHPyIeVIId+hnzpBWb1d+Nv3FezIO9+qoNJ

c7IO4eoDxD+GvzD+wH2WcHvyj+1ICkeUoDj+tzgT+yj2T+6jzRiWj0lB+fiz+JLyw+Jj2RA5jxhBpwJZctj1ZcXXwcelICa2C/m8enTh2BDtwfQ7jxKezj17+tfn7+zW0H+TTyf8w/1CePWzgBBb2qc0TxaI7rwecZgESeyry6cqT0886TwycWTw4AOTyE8yd3yexAP3AtTnagJTy2ew4VkBmPyOuYbxlB9P2r+XW1r+8YPr+UAKb+PT15+ErxH+

rIMqcnf2xmPf0DBhAEHBF7xme0/1n+iz3Lci/xICoH1a+Wzx2eptxJu+z1+UlYKqBAYDOeHgEue1z1ue9zydqvfS3BmUTeedQM+elXx+eNXz+erQN5uvn1Be4L2XB/N1Le8d26BpgJuuAQP6B0t1Guf/1ecUP3Reod0+BmdxxevwNXBWLkLuKPydBQIIN+IoP8+4IOCAkIPpejL27uRP3hB7WkRBI92RBDYSp+/L0xBnnhFevv2UAEr2NeKv3Scs

ryD+2IJ/ul7yCA5oJveIf3Vemr29efr0g+7nyE8WAE4exADNeLRAtemT2G+Nr3sgdryxADr2UATrxdeEEVICrXxYhtdxg+AIKE8LRGDeCH0e+z3zBuh70h80b0QA3LjjeaGgTeYEL/BOtxtuov1pBWd0zeKfXFBREPlBY21TBLLiLeZPmxmBwPLe9YKreNbxRidb2GiSLkbezby6CuIFucHbwXePbyw8r737eCAEHeGnwWAzXzHeE7yneuTwvws7

16CfkKXetYBXewLjXegQDMAwgHkAlWB3e7r33e6wLC+x71PeLYPae1EOvewV3ohd70YhMwJfefby7+n7wneP73OemgRGmgH0NB2IUXB4H29evrxoAqPzkh930UhTYLL+KHxZ2DoIbCmH2MeOHxPYeHzduBHxU+CABI+JLxo+SYQo+YoOo+o10dchUJ/upIMwh5II5+zfw4+nHi4+PHyuapAH4+gnytQa/0ChYn3MAEnyyAUn0sCTW1k+eADbcCny

U+yrkuhqn3dwQ7zChZnw5+FkOKc19zF+xD3pBcAInBi11i+uH2s+5EVmBWLikgnoJieQX2t8gdzc+td3Z+8QPR+QoMbByMLQegX2c+p21N+KIKghbjii+pjzz+BPyL+mYJieyXxT6aXyq+mX2fewoE6c9X3y+jLhXB8bhK+sgDK+1Nwq+6X2q+nWxCEt4NruuXyZh9/yairX0jCHXwUh3X0hAqAF6+/X00gg3xyC1r0pAAkLG+gQEm+8YHZ2h7CK

Cc3yF8Qrk1ey33a+LLk6ca31umm3x4hO3zdue3xxhpAEO+uYTcIJvj6uBPjPBl32u+woP6hYL30Ad3wlhiH3dhL30RegwJheKkOfBwPxaeb4IZ8SwLgAQPzmBhwOact/2KcbX2Dh7wMAhU4Dh+IELzufwMghskN0B0EPRhhvzBBOP1IALdyhBW7BhBKELhBPPz7BWEI/8OENCoiILnu60PeCuIOZ+MENYh290ZBqAE2hzH22hXP0pBQv2pB6QNvu

SoNMhDIIF+lTnVBQfxBhjzm1BnIN1B4D31BvIJgehIQFBaMOQersMxh/nzFBeMIX+uDztg9cI/8coN7hCoIBhEvxVBsoI9+Vt3fu08LThp8PFeU8K9+Qf25Bmv06cQj01B5nnP8t3lNBsf1keloJr8nEOtBP8JT+doN/BOD10hjzgJhLoNz+7oMZeZMLz2Jf1Xh4oGbBdH3M+CwOacdfw5+Dfwu2u0M5ebfxBhw4NGe3jyjBE4RjBAT3jBWCIHBW

wO+h9P0n+HnjmetzlnB0MNKBy/xZcq/zEAG/zr8HTh+CO/31Qo2n3+wgCP+GGhP+Y0PP+FgMABN/2OBnt2Zej/yQBvQRQB7/3xoGAO/+2ANZ2DsJERaO2ABfj1AB2O3ABJCMgBjfyD25CIkRiAPL8yALEwqAI/+OMEwBP/wy+a0V/O2u3JCuux+mxMWam0FzN2zcwX6puyq0K/RvYVu05CNu236rMUqADASiuxAO4BTAIcuFANyurlw2cHlyEB9A

J8uISICuLAOCubALoBQSJIBcVydAiV3dwyV1IAqV2j6dAP5iogIiREgKpumURKucgO88bgMU+SgIqRKgM1C+gIABA1ysBdoW0BENyzhvVwMBTSKMCRgJSBXV16Bn3mERjSI0BdoSWuL13sB/cLbcTgLWcLgOUBx13gCHgLOuSQO8B3SL8BH4M3YT12CBa11CB2IC+uRQUiBQcOiBaEFiBmgDSBfSJXcvP2muaQMVBsQORuCYVyBWr1k6BQP48+Nz

EhS/10hbMIpulQPK+azidh9QKZul4NrAzQP+evNyiB4EJ1uQtx6BqyMEgX4Pe+P4OGBCt0Wu4wLb+UwKYAMwIOBv3wNuRtwjhKwJARWYXWBYPz0CU0JDBewI8eBwIMh+KNeid/1hhPtz9u9fSuBbtxuBYdwjuo10CBcrljuGkNeBL4KD+MP2ThXwPh+Od1AhwcP+BEX2XhPnzgRfn1yADdxpeBcLpe0IOQhzL2J+CII5eW0LyhaIOp+CpEohDcJR

+eIObha8Kdc9P2JB3PxJ+yQKPuE8J7hb1z0+f0MMhTv0BhyoOBhbcLHhPD1NRFTlvh8vwfhBoP5BevxFRrPzFRRv1QgZkMlBFvx3hiCOvhpLl+hzoRpB1qOPhKYJfhdbwdRAqJxBojxdRavz1BPIK1+4fxjRRELfhiLzNBMj3j+P8MT+Kj3/htoIdiVLmGhH/jARRMLdB+fygRVkK+gdj19B92wDBzj2DBrjzDB+wM5RkYJ9B0YJABA/2x2Q/0Pu

2CPIRtaPTBoH2zB5fiSeeYKnBqAELBmTzQ0JYNqcuT3LBYzkrBK/mKeBwLrBTP3L8pf3dhu8PLcbYLfBqCPp+6CK6evYNIRSYI7+Iz27++CLHBIMKoRszxn+tCNo+SzxRBEkPahy4IYRbyPXBoLy3Bpzwahe4JPYB4LyCjz2yAJ4JqBF31+RjQKvBvMJaB+ryBeYqIfBzvifBHQIOB4KPfBxgKhRCLle+34NlurD3/B5fg+BPKOAhPwKvh6cJrhz

TgJh+IJ9RecKlRhcKQhlj1LhLLzQh+9wrhHj0p+qqNwhCpGFeor3YeJEID+ZELleGqI/8xUNohpUPAeDEIfeTEK6hUkMpehr3YhJr04h5r22+fEKVhCM0x8QkJh8IkLjAzUJ9+r6I2e0mPwAMkMDe8kK6+3sOQ+KkKjeQQHZRWkIoAOkNJRh8KMhGbzTeZkJtRF93t+lkJRB1Thsh/7yhhekO5cDkM3RuUTgA1b148K23tiDbzgBnkJ1u3kPbeWH

k7ej/SPBsgEChXfxChmn1He4721eXUOneG11ih5fnihj0MShXuDQ0mD1Shm7wyhtoCyhe7wPeKqK6cJ7xxAgmPLcwmO/AomOIAxUPveGN0qh9MOqh2M1qhDPnqhHgG8x2mPEhbUL0xPr0e+hmNWmxmIe+bsLMxkbzN+HmJZcLoPGhVn0OB00PE+c0J0AC0OKcS0L9RK0KYAa0ODR9Pw7h5Py7h7T0wRg0QOhD4D4+AnwiCwnwuhM0LU+t0MZ890O

uej0Pk+EACqRyn3E+an0+hI7xBhYaMhu4yKM+tqKfuSCMs+2Hxs+oHDs+taOxhLn0RhsEL1RByOzhK8IxhMmP8+MONxhdsILeFaJz+xMMgRhfwLeiXzzAJr1S+kQhphHWIZhj30FhjX2ZhH6NZh64I5hEMVY8/yPZu14KE8jMOpxwsLA+GzzFhjnwlhfEJlhA3yG+isNG+//lVh1IG+uM3y1h8311hS3xW+RsIHY630dhW30tehwMthB3zu8CMNC

o9sLUBPyM+e26JqensJMxSkIGhWGJhRI8wTu+yNBR8wJr+GKMB+2KODhZKNjhJzjC+eGO5R6d15RqcNwxBLwzhwqKRxoqJRx4qIo+8EKbu0qLx+xcLlRqEPLhZIObe1cNtGAr1p+u6MXuWqKbhOcPhxrcJHhFTiOxfPxOx3cP+x/0KMhUaJBxGePJReYB1BCvzbhSaPvhKaMfh2vw5+i/3p+goORxucPXhfqM3hOjylBQaOt+IaPM8eeKtRGQJcx

D9xPh9PwYe58LLxEf0TRvGI5Bd8K5B1eINB4+LVBJoMken8LzRijz/hJAAARJaPtBc2JxRFTmxxroJi+pMIJxxf16C+uIv+rzmJB+6Oaeh6Paex6JyAmCMTBAzwvRXf1HBvj38ecYL1uCYIHRZCOHhlCKnBNCIWeT6LnBtOINhYbjX+rCK3+HCNkeXCMnYPCMP+BAGP+qAFP+MfUhAZ+OUR1/1CCTuIE88AKaikiKMR0iJMRsiPQB5iIURv/yURa

gKAB3aPURvaO920TggB0MQD2LKOhijbwMRT/2MRr/0IJ/U2IJWANIJmu2/6rew9i7e0rGdMyWI+F3m0UKx72AYmXmegC2ATQH0AQgF2AlRlo0pI2ouUOQfqrOHcihlDbO9YG/wKaBwWbcHiUaQgtaW+2TgtXiZwu7UNYlcRK8JcD7MWEFwWmkg9a9XQC2i53BaVi3mW/x0WWaUxtOMlydO25xdO0q2VG7jWUu1BWs2iOUrqNdQ5KOVUlU8Ag8mea

HDOhlxCWxlxFKpl0M2lQCQuR1yYAn5yiiaRLcBNiLIi8FgjyQsg8C6VX44x0CK0DiIN2TiP+mLiMBmJuxBmLiI7mXiOQu1u3UoPcx36/7myJdV0wuv/WnmFY3A4uFxEJ88272i81pgy8y+S9AC14woDgA4lQcmmXn5mCVnbg4UCLgQRDgU+hODIk4iOAyNgCyLcE+ECiSjqW1EDGseVDwL2hVmkXlLiDhPQAWvUNm/82SmEl1sWzA2WWIJ3FWYJz

66EJwUu7p0YUQRLKKv+Dmo+QjS2Gq080dm3nEnCjiJk6wSJqllDmcZxSJEgAAAAhOjT8RE5oSQkFPXrYD8gAz47DKiJRphABI/C6EiXLhBY7vBRuaibdMQj35JADwAGoriTVnAOwCSUZAe/AoBSSQ1E5Qj344AA1EJQGN9rXp/xvMY9M1ADc4QwQ9sHoY0Erpk/5L+stM+IapBHAKoAhPE1DaScyTGSY4B6AAM4b4I04GfI4AKQGiIYAMgAYtFgB

RnCJC4AMgAI0HABMAKM5NSYUQyiIE5kAKaS4AKM5znruxnAIJ99APIBjSbjd3uuE4IAAySIfD345SW6SP/B6SLQoH5iAEqSIAN2Iu/gp9MQIqSGfJSA8xtzBkAF8ADSaM5FwCG4mANGSDSa75+sQ6xkIOFcfrqOBV/uqS4wJNpnAKs4wMC6SGorSTPSfn4e/HGAUnEJ5rIAGSBPkRAknO9iSAAGSgySOCX2Ap8j/KBwAydCTiodoBcEVejCAAp8F

AF6TKnCWSLQm6T43D6T5SaGTggAGTFgCaT1QMgAFibGSGfEOSsXCSTDgA1E70QWCZ/rSTJAOuSyycyTvQAWED/tk5rAIABMAiE8XUyFJMcEHYQfkLB16jd81rz5JL2IFJ+M2QA0pJXJrziZJnUxGgAZIjJcGGjJPAFjJ1YMaEyAAdYEui1K/QDjJxIDr8SZO7uY0FQADrFQgIzmXJXZOVeIVz/x25IUA67zHJDYQnJxZJqg3MAail+LfJCgAIpyg

CaiqFKveXHz1uI5PoAH5MeceFJ78ZFIait+KgAJFOYpqAEopQQGgC3YLU+tFI/J/FIicglJV8JJO5cg5MZJLnmd8oQAfw3vlrAAZM6hoYKdu/pPDJlYOXJ8bmhJZN30A+AGgC+4OJAh4OAxHAHaB45NLJuFLREcbwaib0IHYMwNpJZlKCAxZKL6VTnopw5IrJi6PdwAZMspanzbJBAA7JYcMmcQTk4AmJIVJ05IZ80BGQAAyiXJ72PEp7pIUAJlO

MpvpKnJCABnJVIH8ASx3tAAFIipTlIqcPflsp+AAaiYpNfYkpOxmNlJ0QuVJ78DlKip3pJcpZYLcpDPmDJDZPlCxumxmAZKjAWQBfY2AAU+E82pQBgHGcU4ADJAVKWOXwOcA500neGeISpAZNCpU1CAp4F1xuo2mjJWwCApaMB98uN02gUZMAphpIHJmVKXCfIEDcP5IZ8egE5AoFMqaapyLJGlON02lJ3BFz3eu8FCtASwG9edVPmctJO2pAlJi

po5N2eE5KCpiVKxuyVLjAqVN1Jg4AypZZIG4MgH6c1ZIZ8nW00AJWhKcrpL8hkzhB2rQLxJCAFpJQNKvYHAGepsVPdJcpL3CD+F/eLCFrAuNzBciwF8cAZOKhaSFJ8IZN2pEMwOpDrCOpiQFGchNJSpYM3Sp61NdJwlNpJklJwp0JJpc710cc7EEIAWrg6cCQSYpvNK1cGTlEAAZIAAfgoBIkBEBuxE1CStBwBtANLTlyY9ThaVzdxydRAX2Fq5N

qZ05hQKyAqvl05fbsSC1+piAxwbEDqUGC4BQNoB7IFABrGL85fQN69myXgj+yUB9tAO2SEAD79jaWxDj/D9dzaQwgraQ+hbaTAB7aQz5HaZiSWoUK5tKXGAW3Oph4KEJA/vpHCf7nO9P+F39OnEEAn/MAAnPGgBPHE/5QqSR4n/IsRXOIR4YYWb95nL+CVaZrS1ae6TmoCexBXDMCAyRfgLqbjTOAKySK6cwBd5pTECABtTm9g/B8AZUBYSbmD4S

RwBESfG5kSctdUSRAB0ScEAGfNiSJ3hST8SYSTsUcST6SXPSqSdzUdyWSTGScyTWSf/52SXUBOSYCBC3LyTnsUyF1rvjMhSeNMRSda98qRKSBse+TZSfFSKaSqTsyRqTggIaSppmaT9SW/THSRaTzSTq4rSTe5bSUq4HSa/SnSUA4iyXFS6KWWTMaY2SQ6ZejyaWGT/wO6MoyTGS36fGSYKV8o4KXfAEKemTRnE/S1ScgBcyfex8yQzAiycJTKqQ

1SO2DHAaySQAwEPWS/SU2TL0VjsvKb4BPqRAAuKdpTeyUwzIqWjTXqbpD3qWNSvqXOTT4AuTEgADTcKbuSNyVOj0njuS9ybhSDyUeTeEftNzyXtNrAFeTEADeSOnHeSO+nxCnySfTpnK+S76XIzvyQgy/yUBAmaXGTw+KBTwKWRIoKQmTSALBSUyX+9EKahATqd2TNyXM9pSYEAcKd6TPSUxTdQIRTiKY9T/GeRTOKd2TL8WQzy3IxTmKaxT2KcE

yKKd2TWKXxSXqZAzoqSZThKUJT/FI5SJKcSApKRSAIrFV95KWNj3scSjfyapTXSepTNKdpSrngBi9KUBje+kZSMabwzvSTlSLKTNCLoO7hiqeZSyqWJTNqeWSKGXXSGfB5Stbu9i3acTS/KXldLQPAzgqREd1AGFTRGczSsmakzeGRAyPqUlS7nj9TGaSgzwGaZSSqXlTnAOKTVpiNNOmXZTumYszyGZWT2mVkAAyXVTV/JWToes1SLaW1SOqUNo

enD1TWGf1ST2FkAhqXZCRqd3DVmSFT5yZNSv6aOwZqZOw5qQtSH0EtS+QI6BVqRFSzmZEztqf8zKacSBDqeHpaaShTKmZ28/0VdSbqfZA7qT8yHqaRTKQKjTxyckzvGcOTMaQIzZOt9SXAJsyjyszTemcjSQaVQywaVoBIacuSYaagA4aSvSkaX+wUaTwyUmSszpKU4ZsWXjTOtr05h+sTTlXqTTOWFMzWGftSUWdTS0WdMF6aRsy0qVszlaWSyh

KQoB2aXKFOaZX1+nC3S+ab65BaRrTjWaLTsABLSpaTLTRANjNtAPLTFact8WaaRTVaQJSzWVrT8/DrS9adzTmvkbTOACbTO0cC4PHH7TraYHTg6YGTGGa2SXaW7SPaf6yvaWbTg2ZbTQ2dng7aRg9YGfdSfftxSo6UwAY6XHSXQgnT3gknS6gCnS06U85M6TeiuScIy86YgT0CIXTUAMXS7PmXSXWRXSBKdXSrAJ54BmRAAG6aKzm6arS26UA522

V3TaAke5bEYQhJ+vrsoLlUSPEbGNYLrmx4LvUTELl3NfEVmN/3P3Sr3g2DTMfWFh6RD5R6VEBx6ZPTMSTPTIPgjSKngvSsYoyTl6byFKSaeyaSXSSN6SJSt6WySpYRySRplyTD6fbddGXJ92dgAxz6ZdNL6VLDr6Ycy7WYYyhKZSzH6VmT8GcaTtSR/TDgFNSQGT/SLSf/SL2IAzMgMAysAKAygNNsyGKSZSfGb6SYGRGybmVSzTGcgy1qbYz0Gc

mT4KWmTkILgyIOQr4CGe/1LQMQzCyZqycOZEyqqZQzEANQy6yQp98OaHSuGecEWGZ2TuyZwyo2fCysqVqy+GWByEGbOS0VvOTFyQyyyyRIzNydOjMKRIz9yURSFGYf8lGReT9pmozkCbeSH0feSdGcfSv2VdMSKTKSjGdf8TGUgzlAOYzgKQeIrGRBSbGbU5oKYmSMGY4zNAs4zkKa6T2GehSp/h4ysKV4yUQVEy4mYEzSKXEzQmWhTwmRJzcOXR

S/GdiBCKTEygmQlyQmb5zEmR0yYucOSJOekyOAKJTFmUJTJKVjT8me9dCmUdcFPiUyVKZiA1KRD5TqVpSdKTUy7nnUzc+g0zsOU0zImS0zLKZczEaQoAWmacyKqWxz+mTVSIAEMysgMwyfKf99xmQFS5WeNT5yeFSFmf1zxOejTWuZOSKaaqzaWeqzSOdVzmmbszAOYVSwEMczSqeVTemexzO2TcyqqfcyGfC1Su+u1T3sZ1TXmRig+qYxzPmRN9

hqYyCqWRNSdgFNSQWWWNwWW/TFqUwBlqe/BYWfNzemYiyqWQqz7GUqySZF34MWWdSsWbuCcWRmBbqbVSCWY9TiWQKzyWVlSpOdMy1ub9ToyfSysOZEymWQ85QaYqA2WWoAOWfFiuWfDTKSbyzgaSSylmYKzGmfKThWTjSokS4BxWYTSYAFKyr3jKzd3O9jweWMhUWdDy6aTSy8eRqznWWkydWTkyOaVzTawDzTW6Zz9hye6yLyWLSGfJLTpaQoBZ

aXayHWUrTnWSry3Wa6zPWbrToYD6zDaRBFPaabTgbr7Sk2QHSU2UHS02QRyWyc7T1HjGyLeXGyI6QmyLaTkB/aTbT7eeGzQ6S8j6flmzupjmy+ILHT46fbj2nkWyS2WE8M6Zuws6RM9K2bMzq2QXSSPPWy0PqXTWduXTjWa2yB2bXShud2yEebWAjWfzT26TXSDMdwzu6XwS3YlPM0ADTMhCZ3srBq8oiLuWcJAHcNQ7AbIyALz05idRdakKXZom

qRAq4Bgw84gxRSYCzgNJKAYf9O/Ni7Mw4FSjESOzi8BRliV1tWFORGvFRQziokYuViC0LiU4SYGrMtrJAKtH9nhtATi/tgTpAtVltAtv2mRtITq4sX9BzY28oedDwOmk3Zhpco8OEcgzlLI99sFMQSeBMwSWFFeNppYXzuQAjAPVBYdv+4QBWAKtdmRFk8nwongCJZ4YBLJx2Q3NKiU3Maia3N3EU1pwZkhcGYj4iWiWhccxpAKKCjXysLj0ScLs

ISCwKISpAAvNW+TMcfEvoAjIFLgNgMUVKLsoTnCnM1ZxEPBrrB7IwNiZgNxp8AhODnYYCpvsytCV53SB+orWCcSZtNFMJOL/Md+RABLiaJcy1ikcJRmkd1zgcxG1o4tnTlSVdzk+MMBp8TJuuchM0ChlhUj3l2mGKkAJjNgcFitQx1mxt4Dhxt/+Ytk51qjwXztuzHnLuzcAPuy1AFPSsSYsDuajTzggMQAiSReyySdSSAhXmB16W6SmSQ1EmgB+

yTOa9iIgW0yg/ND8eEKa9DGT34dtsKyOicdcAyTItRubdy8mbJTOAAGSXwt7hlyeVcNft1zcAA1FMiX3SkSeB8USWiTvBYey/BUZBwhUELF6SEKNyf4KV6cQBIhUJTmSbEKRADD54hQKTCPldDawikLRIGkKsKVELMhXkzshQ3sGfHkLAqcKyihRwAShTdByhaOxKhbSTqhbkSPpsgLfpqgKYLm4i6idOzkxtgKl2fgK/ETDM6hSPSGhWPSmhRiT

p6a0L2hcEKRKfSSwhb0L+hblzBhXEKE+nozEheJ9JhSndUhZxD0hfMKH8IsLSALkKDAKsLChQUzesVsLXSRUKowFUKahS3ta+W3teiRcJ+iZQLBibydaBVflFcmwASXFbovUP0AjACYBnADAAKiFw0FgJoBPTr+tFFgUgvZECZY8hIkSwFid1iSAJoDCZgmSudUOLgxR76gppzWHyIchImYaEiKJzia4Sricucbie4S1zvcSNzpoKtznJcdzrfz2

1sOoDBYqtUACQhnbMm02SoDom5DxpLwLXIapkEscTg+cozlBMeNs4LGjuQt9EmRJL6J3gEqGYh4qF6R8IIKh9ikoZS4NZgQgM0VVEGFBhrOMcpKqbVXVObVxCXyc0OMJh3RUyBWanURFIB+A/EmkhIkEY9FILwd3DqZVsvJnB4gNtQhLL2RDKGAU0MvtV00q/MdvISpP5oWt6wEYtt+TQM5RUoLfjgg1cmsqKllqqLHicRtniZwMeknlknxt/ldR

XCcARiqx4aA3Jrzh7NqsgCStWJ8J3Ir/yEDo4LpauEtABaasEzqM1eUCRA8IGQx7oLqRUuLsoQgAohRyohBcIH4RAREzwJ9CWBizpGLSztGLl5kJBqiFMT/bJgA+IMJgOAM45r+IQA7cswAVQDABREomtTBDOwm+EQhBaIEMxerGlZuJQkuNDQt+RjMybjsV0AsMOkaulBVkjkkcxLioKQFify7Tig1RVpkcfCRqK/CboLXFpPsvTrstGNnAIOmI

C1kTlXwN9pRL82HwoO4Al1YDredrljOkJco+d6jhEsVxZslEzkhgthAexyIJhBVCl+VYqBoho2pygzEElQ/hAPgEIO1VnEp6sJjlycL1mIS/VsvNt5vBRlAFWcHjORwwaJEhWwMJh3gMkh3gD4pNWpCk/1kotvdAiZY0mXAmcPlZZJt5NnpKFAWkF3BaKJkp1ELglQsjXoPJdkppRdHJEJQFVGxc4S+VofzQqsfzyMuAtX9hfym1lFsXiVwNB1Dw

MK9AlsVLoxtyGkDhUtsaLbJTRKoiR4FeMrYLaptaLWJbaL8Tjt0edLI1mKp4RI0IohJ6noYwQHhAojHIgK7HsB7oHzIORLhAW4GogepJeLPrFGLlJW3z0AElQvUNJIUrggAcQK2AhIEcA2AEPh6AMJhhrtsczJdj1C4D9BOcJowi8FkkR1tqwvgE/FXIIolhRScciEl5sf8DrNqBuadrieWtvWvytgpbcS1BSqKNBZ2LL+SRtopb2KaSjwNryoOK

gDoQhw9AmYKJROLNLtOcvpTqMTWCFkM4MctLlkxL2Njct8pVxsZ1jPlHRfxtNiugBTEKnAKMLhh0IB8BdSOopz4grBtgNVIeUHJs5dOyQ9SmGLOThYMfVgRcbxT1LkxsX5oGN6gfxZgBw1JEhdgJEgQ4NgBkrkpcDNqZKCkA3xdCVQ5hYBCYCVEENoytsSOcF6RnbHsSdpfNLzVGqcXSGsS9peMtZRWdKApUFtrTgb02xZ4SHiRFKtBb4SdBVqL3

TooSXpWB0ytAXYBBocsL0E71CWrDBHMA9gvFjec8tjINQSZGcIZdGd7RagdISUScNiorUNshFByGgfR1ENG1/CAqUNELOBXyK9h9aj1IM4MohkgCKQOpZYNGZtMcSRZUAvUEYBX8vQAJJHbdJALsAVQLyEJiRfgJQBKAL8DNL2ZTZhETDnYKwFioAypjZrBIXLS4sAU8FsUk4ajWLs2LLKgpfLLkjorLWxZJcwpefyiNrdLuxc4slRtb0mTAlLgi

T6JyEjOMjZTaAcJr9L6ij8xpqJapYiQHMJ1n/y7ZUgdzRkuKHRYScSpYuskMJAgPsAsMjpOHA3hLFQFENgwz6IOBV5L4RUqEKhdSCEBI5cTKlJUzMYxWfx4KARhJFrGsj5ilQ2AJgAhAJgAwaMoAFWvItgLKyLqkLyg4gCYw1WGKpMLE9pEILygT9unAOFJXMRZfqL76oaco9JXFxxbrMNIhadjxsdK0JbhtQpUCdpLmqLZLhhV5Lm2t3TvZN6St

6dXpToQVhN2AIDmYLODMwVzLF5g9Liol8trbKbRfbK7RbOsnZXxszVrVVupFlAGwO6YEqC9hNECeKRSAakOFPIRhJVoNmeK/ET1qJNCZdwtIVt1K6BT/RAEtjg4ANgBNIJEghIJEgKAJEg+IGDQhIEYB8AF0BFIGOBpOqzKAFYzg+FKbxHbDsBr0I8wntAqU3ICxQJEi8A/oPAri1MtQyUKZgpJpHlrqnCQZZfWKjpQqKTpQ+1G5YqKbTh4SpLl4

SCFbhKiFZqK3iYDgiRg/yamoUdz4FcBaCu0NjRUicJ5YlJvaPMRa5VbK7BZ702FeDKl5dxsuFbGceFauL9EpfRk4KDgD0pScbRvEpQYCCtooOV1YqMyR0IBUgCMNfLuTrfKY5VvV4KHoBsAGkghFsKdd6iqBMAJpBDSEZBDgE6UdZVYqIlIAqoBGUgOOJBYFbP410Uiw4/ykwZ4CDJEPSIEqlVgdK5BQ2K5Zfvylzv5KolUrK25Xgq4lTdLIpVfz

JVjFstZYDhQxbrKHmELIDKMGYxxdqNJ5bwAy4NyID9lINrZXed4iYvLEiQ7LqlUso94vS1uJYzQPZb5AiWNogfhMMcOaMfQTFHwpI0LFQnyurk5FYqAXEuGLjGl1K75beKcQFAAbTGHY2gE0AesifMjICHBSAJgBfYPts85YArvSpsJPhCtQ40jsquDOMQARkPli5elsRBR0hqxYfs4SJIM0FTXEsFShLlBS3L/WncT2xddK1ZeqLElfhL3lVPJm

TBLZX+Q3It+eecx5elUY6mLMSlblL7zhUroVZwqoZWvKEVaM0MxEcBsuO8JBUAWkWaKYhupOrAdVvKhzeKhBZMhqYzwAMrFJdQKhicvMPYCqAJQBJJagKQB7dCfg0kHUA+IBwAv5bgA3DjMTEkr6Z46gWo1Tgl1QQD9KAoPHk3ytmqHFRfQhlOE0avEyUWKPhh3CqZIxlqhsG5X9Im5ahKFVTWsMJXWsz+fgqnlerK8JZrLkld1IRrGVYSEJ9LRV

CxtIiWuprBMuMjHHOKHBVCrwSVarKqjaqmjqM1XQMCI7VmzRXeuHB11GaoLgMhB2SL4RwoG3hKMB9BkuAGqpjoRoyZbsBpWjwBxTkpV3gL0A4AC0QegDiBRgDUAL8Abp2VYzhWDPUgBRXlUBNP40cMCcAY8lXYOmLyV9VaKqSEn+qjyMLhsWDMkUNjKKQlRhtZVZacsFY2qKlMrLYlarLO5c8q7pT2LGMn2LXFoSryFSRLxeghtBsNcBhlGVN+ck

ERNhuKqwVaUrehgvL2FZUrIZbOripbar9ErBBjECkq2aAohImEapOlarw/hF1JlEEmBlYH9A/sNyKj1WSrhlWz1CAEJBNgIc0hADUAPksJg6gJoBeQpgAQ4E4ZdgNssVlX8ZqkB8BATJox/sN5AbJaPz6wM9gfSmZs9On2YjCfsTPZEgrZ5V5swzrBq5zvBrMFWErsFSFLUsgRtsJY6da8nFViFb3KeBnN5sYEVNDBW7oIeKCgxxRYLTZechODJw

IxYBOqwZccI0OsvKYznCrBCrwrnlr7h92iqZtimqwCWJ3geUNjhmSCHKK4P4wsxC6tUuCN1l6ralSVdeKVFbHKJABQAP5LfxDyVVrWBb3zA8uw5ABM/ZL0J+pBiC80FWMtQHbAOAFNGOMNWM3Q1uGkM0SMrNhzqpEziU5qhLo4SEpvKKbleJclRfcrW1Y8rVVYQq/NUkqSFYDgHIl8ri+C5M8khFqmmlFrJxZoRsemShPgAlqWJUlqQ5sVs0Di+d

AkVwDbLqEjyAU5cikROx2eSki3tX5cEkUFcQrmFc/tXEjbLuki+AVkiBAXkiYkQUi5QmICqAaNoqbjlc/fK4C6rsjqA4AI9vXoE5CAHy5ZwITcSkax4ykUmrUdTMjFAWjrjrmy5VAQ0j1AST5WrvMidAYDd2kTTrDAb4DWkQkCLkQMjaddYCRkXYDaQRGiMgZMisnPtcYAh+Kyde4C4AJ4DWkUsi2dUkDTkYEDedSEDOAGEDvrnsjkMQ2EYgcDdj

kaDdIUWcignpzqNdVcikbtkCpwHcjvXtjdfkoUDigSzCIfO8iEXN68kYdB8gPqBjqtrriGgczieYZzcmogi5YMSCjfMUE9YXrrrkQphi/YUMCvcdbj2wbbjlgZD99IaD9MCUAiC7mi98MUnD3cURj+USRjOUUKjAQaS9U8axCg8fnDaMbKj6MfKimMaT9o8Wxip7hxi64QdiE0WRjynpRiA8SjD2ngaiGPkaiWMU6jUAL3iBdQPCB8QJ4f8X8y40

eXji8ZXiZ8bPDU0U/C+QXXil4X7jvUY3rRQa3jMcTpDA0fg8a9T/d94eai3MZaju9Rp5C8RE8M0SbrS8ZfD58VqDJ8WXi3UfPDj9a/DF8TH9zQV/D5Hvmi18Wo9U/pQEy0eW498RAjq0fjj5sTE9yYd2J7Rg7cpGQ+iUnoAa0gpYid+iHdbjOuFSAmkgcQFR83+InjXnNfif7gwT78V/jz0Rz8+OdejX8Roi49q08z0QM9yESDD8wf/itgVDiivr

pD+oiEBAhVdEOnASBZEVOB9Xi0QOauEAEcZJ58/BdFQgiNyB2BnTraaM4wgKa562YsDJuZMyo+YvcgghgTsZmWzeDV84BDVJBYgTKioAK+dgCSc8v0ZWCHdUUz5nC7rvkbUDnYZBiAUazimonQa3mbBj8gIlcDAGDQSXDABI/EYaMUIwaEAMwaTaYEBhgH7qk3mCiYXhCj0MeLcQ9QMCw9W8CAIZi8PccRiY9cj869RRidUajiJUcHjEIUXrO7gx

iFUehClUZ3CY8exiyMXhCuMYRDiIZw8p8UuEBMUNjyYfs59IPYbQOJiA4DeX4M6VkAkeQJCcSfDijXhxCuIV+kVcaaF1MY68tMQp8G2TviW3mSjAce25HMdQ919W30LUaZ9gjb/5ZAI5CAoc5C7Yq5C2AOFixtpFjuXNFiRjcjcYaVW8nDUFCUsV9DUABFCMsU/4ssTFDynnlj2eUlCiseu80oVu9MobrTsoVViK9Z05asb7dSAgUamDcUaBPHO9

yjbiyIYciKcaQNi2jWF9SPqtD+PNtiMHrtjSAPtiu8Ydi29WSCQYWdjOPo09DoVdjTobdjVjVwbHsTJ9nyU9D3sWgBETfdiPoaFDfsRBEu9d0be9ZL8KEe08LPuDCfIbZ8F/j8avUSCCqMWjinPsF828W/rM4dn998STCPQUfjyYTAbSjWWzOtkzDyTaBwM+coblnOQTREeD9KUSwSpEeX4ZEWgDOCV/9uCVYjmdWd8KCYQie0bGDNEe1ttEfQTu

wXojmCQgDWCfgT2CTKbnplwSwDTgDahQKFCAWDqAdcwCgdd9qaAdEiUovK5UkfEibTRQDkkTEjnTeDreATABMkVkBskbkjAgPkjMroUjxAUjqInCjqxdTUjjrhjrp3qdsGfDjq8dbgACdVIC/vDICRdaTqozeTrxdVTq6kbNcWdZ0itAQzr2dXEDhTfmahkV0jZdSYCOdeYD6kWd9DAbYC7kdvqdrrs9MoumbIzRVdZkS0jFkZoArrpWbOXPLr1k

aMi3rlsjnPuECfrn9dLca85NdT9dtdRrr5dckCDdfECjdeOaD9Wbr8gZbqnkUUCg+YSFivvTiTnAz5HdZXzNDV8jXnjoaIMR7rAUdLCA6W0CXDYnrXwc09qzZ+DvDdhj6/HMaQ4c09fKXbjhjY7ixEZSjw9VyiCManrvgenrhjVnriXjPqaTXPq4IQXqFDQT84jaXqMIUkbrjWqjq9aCba9XHj69eEbxUeni/me3DwTVtCO9fibFQYSb+9d3DB9R

3qR9TPCWsXPC00QvCxXNPqc9U3j4cQCb/Udvjl9T5ix/N3i63kRaj4S79o0VxbM0aPij9fvrKLcH8x9TXj00QJaxHtDBs0cvjv4avik/kWjn9fiFt8Y6DmTc6DK0Qfj2Td/qMwXns/9Xt98wSpzJnMAap/kZa7fGAbBXDcDIDQuDOTbAay/AgbHnEgb3gigbT0Q/j2/hgbI2VNtsDdQT+0a39v8XaiOfsQaH0QASkwmQbXkSeak3FQaV/EqEbDWn

g7DQ4bWDUryxDc7toYlwapDQk4ZDaM45DRiixnBMzMSaw8ODds5JDTwaMrfwasrfIaw8UobyDXTjybqC91DWVzndRFbzvu88LwdzDLzbFaGDW0DTDdiAfzJYbrDd1TbDY99HjSwbxvs4bJza4b7zYHrPDcHrArqHrYUf+bE4QEa09Yj8OjRBDQjepaILQSDIjTBaw8XBaS9VHjlUchaq9Q+B0jTxisjTK9cjRz97jdKhhrSUaXjaGDKje8bRsaxD

ajfJj6jWbDBIb44NMaJD3se0a7Mfp8CTb0bjPv0bXMfm8UQV0F/MZW9xjSFja3kRC3Idp4PIf+aFjb5D4sSsb7DWsafseFD0sZO9MsdFCcsfO9H+glDOAEcaUoRu90odu8LjZVjcodcbbjeN98jTdaijSwbuTa8bHrX98+sX+8mod8aC3r8a9sf8bKPkCaQTRX8IIlniTUax9T0ediYTZdjjoddihPudDMTV9jJPpsbpPqMK0TVUj5bVdDvsTiat

PniaD4QDbiLbvrTPiDDSTRNCIYeNowrZ59NrbSaJUejjWLWpbfcYTCccVWjD8S+jQPlyb7rbybqcfyaB2O0bgEVzqjYvHrsCYOx9TVKaCCUab9wHKbTTWQSadcqb6tqqavdloiP8TAD5XAwSdTXACJTXgSQ7YaazERHbFEbwTa5qOzZ4qUTvpvXNjhaVsp2be5jdhgLzhVgLO5t4j0xjcKV2VtELLv9rSAWEivtaGb7TRwBQddFd3tYDq3TSDqPT

S3aIdT6b+ATkjBAY6aYnMGb4dXabJARwAIzRTqmADGasdfGa/fImbkzfKFqtsTrRdQvbuXNVdszQc5qdXWaCzWoEizUkCmdVzrWdUHq0MT0jfEIqbLAeWahrg2axkYqChdek42zTva5kZLqFkSYCZdVfaBzUEChzW30RzTsiIgROb1dajCgbjOaTkVfbzkTWalzfYDjdbcixfubrHkUmFnkSUDqrbbq9zQJ4DzRoatDaebwMa1amgQYarzTbSbze

Na7zQHqPDTfaZrWf45rThi0UcgiJ3uHCTbv9at9QHaFrf4agIcBaVraRiMLWEbc9bqj89TRjYLSXD9rW3qWMckbK9akb1UQ5ajQXXrtUYI6IjTha/mSLb+frhaeLQXi+LUXjcLeRaK8afrL4efraLR6iOfo3j/cc3iJURvDF9VvCO8Svq0LWvrbfrrat9QSaDbZdt99YPrL9X78DHdPiqLaH8L9e47r9TmiLQffqFLYWj18cWjNHgnqaAnbbs9eA

jccZ/r4vtDjQPvpaADaZbCwSZaPPGZb7QO9dLLQ85rLQ2FoDXZb4Davr3gk5by0bxTXLWgbH8R5bn8Vga1EW/i+0SQi3LcmCdHe08grTODACdDCbdYzjndlFbGoTICOrQgB4rU8aKHdUCUrZwasTe2wSrQIayrYIacrf5SRDQVbxDUVbQItM6+DRlbsrT9cFDVVbwrVg7arWobcHQ1bjzZzDtDYQ73dW1aSHYM6TDWYberRD1+rfQahnUNbGbY4b

7Dbeb8XpNbqHfC9nzWbjXzZw7k9UtaeHaBC+HYz9uoVnDGLeY7mLZKiIQaHii4XtbI8RI7y9fn5Y8RiDOMQRCzrSa9sjeRCeHnRa6bXnsHjc87njb0EWbcwBbXtUaXrXJjAgApjuIUpimjV9aWjQrSubeDbY9XraAYUDas3iDbKwoMa3Hatay3lh4xjYliJjYtEZjbQ83zcjbYscsaAoasbksZja0sZFDcbTO99jYTb8scTbCsaTbTjWVin/JTbA

gFcakXWiDabddbCjQlbmbQ9aSXVUa6oRf4GoV8bfrVSaNsX8bFofzbegptj5/vY7d7vhbO4ZCbxbdCbuPlLaToTdi5bejakTUra7oYCKv2c9DRrdoAuDTK6/sU47w0S47tHbQ8jbWDCTbV7bzbRrrqTVtaKPjbbGTXo8NrQ7bWTXjjEnS7bbLca6PbVaAvbYKbMHXmalTaKbiYCcD07c/9Q7dnaLEbna/ba7t6nTgaE7XgadERdtU7WNt63WwTTE

XIiTTS27h2b+x+CdhdZ5tRFCRYRcl0svMJgNURkgDkANgPoL2tUZt+sGXMfoIRZ++doQntLik3II8AMuLUgQsNZqXQN6UFEshZBsN+NZtdLgNlbKLFBfWr5VS2LFVZdLlVTnJ4lb5q8iv5q7Zq4sh4sRLu1q5xSumnBvIG/zypibLLtciQEzItLGJeCrmJeLkHtXUdlxRIIXzgsBL1EBoYnt7506VDdRgC+QU+p/j5oAT45DaGAiwgz503JWETbi

h7iQEJ4M6cnTsZnZMLXR05CPT1aJ3tryAPqR6oaUh5rIPzDxQLYDbnGW5mdmgBBogZ4XLVkABPZX4DPJgbCAKJ7OPAZ52nT9spPUBAsYkh52IZR6d3qbz5eb59fWUs5LefkAWELgBkwVABbATPT7riJie/Pq8ePaK9LoA1EqPrT8DPNp7xhe9CsgPp6uDUZ7QfE1jvXobdcrVNyMHS85tPSNN9PV38XPfh6pwJJiCQtp7Fvvp773oF6TPUbELPQ+

ArPXPdbPR7ydPQFSnPQFSovW57qEKMF7rth6lDA/dOcQkEztjob8vWb5+Dfe9rPViD87pbzAHsXdM4UoY45pIBvXgoAEzRbqFAIea/XhnTaXLQyK+RlCGfHGAcnEIAwEIy6QQse9AHtoBT3klbXnKV6QHN68V2HzBuvm74iQNP5DzQwgfrstdBsQU7VnvndzfpN6H0LYCztpnDRvdLSrEUTcs+QZ4ZIPwRRgk7CTefrTwaZDTU6WgAp/JWFtALc9

9AKMBGANnsJvcFcTjQKBC9VgT0QlN7H3jZ7dnlV6FPKC66veT5Gvc17ZwK16imenSzfMSi0AAz5tYXxAdXmb4wHIDAeOhO9OrjkAiiDHAGfIj7fcAAw0nOzzrWZwA2jdL9OvbJ85wAT6+vb4BBvTQAzfIuAIemgB7UPAlWwNoBBot31OnBnT7PddCaEN5i0AE1DU3CO8M+ZM8/rRD4RveEAxvXViJvRU5LeZEgavYG9DvYIBDKeo9HoRD7OcQl6S

vQHTpvZEhB3hUbTXQOwtjd+8LXf1jObd56sXEZ4hTRU5+DTEhLQJ05xtASFibry8SfLNDcXXE9GKV8KehVezAhZELohZ1zwRRk4GvlaBdaeKBwPO+T+Kf2FSApjdmeaszgAOUbyND2hkoO64pIFJAnKSSSySSvSb2b8KsXMABFvlyy4afwyfyfH6sZgdSJ3lDy1Tn681uRYbgafoAfmPWy0/Xn6QHFJB+KWUDJPK+ddPUraY/d6TmSf1lpUOZ4Dg

oYysXL7c0AN37ImZtSsqY+yd6c+y96a+yD6TySARc30gRVdNtACByX7kX7FSSX68GXRyJ3saS/XjqTz4PGgn0K/SVQDq4CfRaSYPje5vQEAyCfY6TP7G0a0/RBEN/dOSS/cRzbOeowY5q5z7GRO93OZRz0yX69t/eqSJ3oQzGOQWTGQA/6J/Z+SaPWAg6Pfj4OnKMzgALp7tABJ65DWWMAdsiY5DQtz3gjlz6fnhSKQSFyUuURSmnrEzCA084kA8

zsW/ZlzcA74zomd2CSA5wAQmYgG1vcJ6EAJQGluVz8mA1EB7WRhTYaXDSx/d3Ce/JAHvSbuS4/Qn71mRwBCcLqT1GA37JGWk7VObIzcLZP7jGS/6M6W/6fmDHNLGeX7rGf0A/XmgzEyT/6KOVgyvORAG24aW4kA+07tvbhbPGQgAhA5+SsAz/d5nJYHsA1QHImRJyIAnlyoqe4HCuc3TyeVAAAdrd61AI/6OfngGR4dlTdmZ1zrKT1zdmX1zbA1l

T2OQgHefWp85DZwAIEQDtrPk1FbfZM7TtsFcYNNbTXad5TZoagHi/RnTc6QMoG/WJznA+wGf7s/7EqSX61uZIH6/an7Yg0uEWmbtzvMQdz7KT0z8A1VS24QgGRpk4H6fikHccWkHmXvwaS2doBcg6hE3aY4G24VVTqIQ8zWqeYBtXsXjOqYM7HuRN9nud8z6fW3CxqSX7c6Y3IpnO9McoRtR+/DIA9sStT3/Uu5U/RSD7A64Gqg9gHsebUGxA/4A

Ggy04ZA/gHieRxzWGQEGoaQ1FOWdyyffd1ziebYGImd6TpeaQAPYWWTbgzMHGeUOTrEeALetBR60PY97AgRnTsvTh7Kwnh6RMYIaiPc74SPSEAyPdiikQ1R613F39YA3P5GPcR6I2U1C2Paw6I3OoyzPctdePUs5+PUnahPRU6RPWyGlnBJ75PdzAZPTwG5PVyGD3Ep7/7ip7rvdzSNPebyfPUl7dPU57lrul7iYKZ7HvuZ6FSPF6gfdKHeQEJ4d

PVkGnPVkGFQ8F7fKZ56RDaF6kvX56ZDQF6W/iJiQvYl7NQwGBwvTIbIvZaGmsfFyHHLF7xQGqGKvVp6ZQyl6ZDXb6Crk6HiYDrSJIFl6wgDl7TIcV6IfIV6LvhGGsXAD7yvfgA6HiD7iPLB9wfQ16GfE17V7S162vV1COvZS6qfR+AafdDA6fYFSfbYga9XaN7xvTvc4wwz5ZvdQafgot7NAst7DXkgHtzZb7NvWb4Bg76Hlrvt6lfVL6jvar6Tv

Si9zvUGBLvTobxQ/Lyfg/d70PU96XvW96BQFKHHnF97UoT96FDb+C4w1r7dIUmHFfatNUw5D7Mw9D7sw3D6QQgj6J3sj7UfSCF0fSwBMfSjznpjj6+IHj7uACvafAETabAP2HyfWb5Kfdc9qfcAGiwwN7MSdL8mfUAHWfX+YOfZX4ufTz6dQwL6BscL7mvjDCxfZGFJfRR9Kwx+GPeQr7yMQd6+wyr6U/ur6GvZr71Q7GGdffX49ffay3jZsbsbe

zbGoXazWw269cXNb7fQwFSHff/0nfXrEXfQFS7jaB9PfaELvfQjS+hXeziycySA/dMLNAqW6MwKH7OWKv7ZhZH69YtH6VmbsGE/RRp5yfXAU/UEHVyZeyT2dSSc/efj8/SDtC/Y8GAdh16heeX6aaQkAq/TSya/Vew6/dIGmg037SAGwHRyW36nnB36mQ+O9+A5+Te/eNLSXIP7ZhWb4R/V04yyZAHohdvSSeTP796dyTYCezsVbfoyAGBJGLOe4

G9I1v7aOUAGGfHv6uoQf6gVZq6T/Wf6J3hf6uodaSOANf7UObf6QGff7frSpH2njUH9Iza9Iye/78bC5y7GQT7f/UYH//V1DAA4WG8yWAGcQCYHQg9AH8QNYA4AwJyOyZwHcAMgHPLagHRtOgGOcJgGQQ24Hgg6xzqA6OT4uQwGiA3rd6A4RSyA2t6KA6CHyozQG4mUlzwuaQGho9oAWA3ZGmed3DDo+06C/X5Hi8YIHTA0uERA3JGADeIHXg18A

ZA8pzpGXSSFA4oGvyVZyVA1VH/yR/77ORrgCfWBSnOToGuoXoHv/Qz5Go6mSkKV1HFA5U5zozwHOw7gHAuTYG24bSTmgzCGUY3NG7g8sz1/ZkzPA+v7vAyCpfA/4HfA2VHqgzjHqgx1y2mZEHeuUdzugxQyEg1kHkg1Jhhg3n7Rg7t6sg6nSJg8lSpgwUHHA6IHk+Y9svoMpGKg2CH7g7FyhY/UG0qVZGKY+VHWg/syCqe0Gog10yGY6EGeg8Xi+

g9jNkY+8Ehg26CRgzNExg9jMeY5MHkQtMHdY1XCGqfMHLuY8ylg78y/masGBrWnh1gwNSvma9zi8Q9H9gzsBNXSXMbQH8BTgz74zoTCzLgw36bg9NHJY5Ez4o88G4wM9H3gO8HQg58HSeT8HKed29YaeEK6efyyn/S4HVyeCHIQ7hToQ04GImfCHoBYcL7ESXbHEWXa0BZXa4LpgLX3FcK67VDNbhf+5iQ9OHUQ1h6MQ4EDjPU1icQ0x78Q975yP

bI8VPdR7i2bR6+oxSGtvlSGWPcFdaQ9ij4+teTGQ1EBmQy85WQ4J6lnCwHeQ8oBxPZ5bN4/yH/OTP9BQ2vHhQ3KFlPWh7xw/05JQ0ry7Pctc5Q1EB9Q4jTF4zts3Q7lT4wyaHbQ9qGFbY57fQ3qGAwwaGJuUaGw6TaGTafkAzQ8bGwEPfHrQ16H34/aGAfffGXQ9E5n4x6GEw0AmtQ677UvZaAIE5l7+wuiHcvQJ4Yw5U4ow/Td8E4851w/hHXnF

uH0I4G9dw+mGofbgAYfQ1bMPZ+HuvYWH+vfT6K3cN7yw1L7kIw2FqwyvNQniv56wx5GvPC9aWwxb7DPO2GQQp2Hbfd2HYPsr7jvaUDTvUs5hwxhFVwVd7vWROHfA1OGUQ896cmXOGPvQkElw6WEVw2Hi1w4RHX4z+EKE2D6H0BD6aE/uG6E4eHZfYpT3HgT6zwwz6LwxhoMfWWybw1OA7ww+GCffjNife9dSfXQyZIB+G8w1+GCwz+HWE/+HGfZY

aWfWz7QI5x5wI1s7P4/z6RpoL67WTBHfbnBG93AhHOE0hGZfZmF5fduGhPHInVfboA9wBr7A7RuGCIzbTdffr7SI8b6KI1a66Hlb7K3ZAFdvQxHHfWd6WI2iDXfexHyYZxHuhW0KfhXxH/fW0zA/SJHimA+Bw/ZJGyWVH7QPq5GKo3UHE/YpHY0gnHVI5n7AQ9n6+I2b4bI5dHlkwZGy/Qz4K/YkBTI+IHzIwYBGg437FvidGGog5HgAE5Gl4y5H

1OX37PIzFGnKb5HXIwxSAo1P7gowOwX2ZIb5/eFGRhSG6EhSv61/ZTGH6Zv6efYlGio1gB9/WaT0o8f6sAKf6kUyFSdXJf6L2AVH7SfCnCiCVGNk9tHoU79G1AwDGIYw1HDA6mTmo0/5Woz+H2owzA4Y1z8e/D1HyQ/AGCgwDskAygGMnONHgABgHxY7jHTo0SmUmQIGdo4QGwuRxTDo5tGc4w8GFo7QHG/qtHGA0gHjozgGOA+YGeA5dHvk+VHm

gwxT7o8UHHoy8HZYy9Gmg29H5A9qnhyeu8hY6Snao2WlgY9oHdA1/6KU5gyYY6hBGU/DHEY/vGYAJbHnA9hT0Y7cGP/FjHyo9KmGKTNHqgwTHMeZEziY7l8IaWoAyY9GmoAPLHYuc0Gwg+ZSIgxlz6Y10GNY0zH2U4gGWY3b42YwbGOY0bGuY6knTY3zHzYwLGigzCnhY/WAxY36m7A5HHVydHH9U7HHDU1cGE09gHFYwcy9ud1z00/ynzmX+xeg

9mn+g23D9Y2Y9DYxkHyAatscg2Wn8gywyA093C5g01TbY4sGbuW3CnYw87XY5sGPY7havY4pGDg+Bdx+v7Gn/P9zgTRcHz4GHGR4XWng0w2nPyU2mZY1IHBwISncA0nGWWWTy406nHu+tTyeWQoBgQ9nGqY3YHdWQXHPk0XHMuSXGSBd0T6+YIS+iRQLoONO7oxcSKt6nxB9AK2A0IPgAjFT3y13a5xmcJzg12vj0G+Lu6LLBPyqGNlQsoF9ot2o

ipuShgwn7FqwpBT7FdpLQ5QpkV1UTkC1zlaEqFBXvzwlQfy61bcrW5UqqVZR2LttQkrdtRqru1b+KjtZ9AtCKXFaKKPL64IctEpHprfIAoc7tXB6J6EsUwlskTgBQSG6Sr3SJAGx6Dhb2ZOmMLMw6kpF4BSLhwLnrsUBVXHThUDN52RcKGiXTEmiXgKDRK0T/EbpmtM10S6+ZDDJ3dWM4M36sEM2z0C4VsBiQJpB7UPFK6zmwKlFkxxutX/pEULU

hBcC8100kRmVqFkrU4EFNTWEArB8kxxcGNe6Z4nEAGM+iomM6lLfJWYt73VcqXCZcq1tdEqUNe3K21YJmP3QqNW1gFqnxv0lxMz+gctpXNTBWqsnjkGdzjnlRomjlKrRear4PWxLEPc+detDCLzTXDLxdfpmtqKlAgFYMsTM+tQjhZXGzLuXbyYjZm6454iHM7gL67c5mCBVkTps1iLSBZBncRQPJ8RbBmu9kSLZ3WTLnAFrIEgBEhSAF6hJAFsB

leEJ06gIQAJQMkBb8NCdsxamrPDq8AZ2NLASwMWBpulZsvoKdIgTPV5lWFehOs/OMA6Fa18rIjmkc4e1VIlLKWM1ft0FS5qK1ohqn3U2rcFZtq0NThL6szAs3ld2qeUq1nkSKrAABN7I9Vf8TS5lZUI8iUTgZTB7QZfdrVMxI0UtY7KalfOsuJQurNFCtQ1DAexiWDBBupAZ0xAKhlPhIeYjsqcAPoOJq6teSqyZTUAKAMwBNID6guGnABegAI0w

aCqA+vsO1hgFBRX1cossIDHlWVo8BpxS0NxxjWmyIGQli4tDm4hgYs0LAAV++Z7Lr0K5BoNT5L0c58dMc25q5Vc2L9erxmX3fxmVVehqO1eqqu1ftqEgFmLqmiFq9RYZY+RpqMjBWRq02sXLeaANmDLuUrhswVLjVhxLoZRlqSTmZtiteAox9JAgrgNKgMztjhtBN1IBUqrw/sOckhZHLmdCgrnVFTIho7CSJhQGDRegPgB3gGhRFII/wmgEapeg

HbpCVQotVlSilxULOIdVlbw2ltV1vJlecfFU3wChEOIHc0EVC4GQxW5EUJyuu7nMTJ7nBLt7nVtTMtrlRVn3NRdLm1c/t7Tt5rG0hhru5V+7YpU+M9eBTnFuo5ochJbKJ5f1hZbJYKxBnGlAGiKrTVYNnIVfRrLVYVLC2rnm6lcIUTBlmdryJuZJUKOUSICKQ8ABRAtShoMkIChZL6OrAvsA3meFk3mGtegA8EEKgvUK6VH9KQB4KBsBRgF8kuxC

nEYKIbnnAMhYHpFkqjHPIRJBgFBSIGHpEeCJYslLL1ikgEqvNojla1aUoys4FLuM5Vm7lXxnUNQJmQ82qrhM+Hmms64sCsjCcKFXrKh0n2QiwO7Ms2D2B7RPOJKKNXLWNmar/8xarp1UAXMOrUrec/olIEBmJTlEKgMINFRFCilJVEOFA8wBPoPoBRhmSOaopYC+QMC8oqsC1vU7TFUAv1nxB7AF6ZQEvpUugNlBrGvBRcGtpqkkgpm0oGKLW5GT

JGLvhmVJLxk/ZJ8JtpSQkjgEFg02NsSEuo0Yt8wJd4jnBqfcwhq3NUhqW4p5rkKrVnxCztrP3XtrpC+2twZvhr/3TLh4UplBaFQOsLtbIlPNK7MGNBw5lM+2Us8+xLRs8xr51fok+JWIBICsDhJc8/ZKMCuZsuFRRKMDlBiIC+RYqO4X8lqTLm84GsDIJIAcQG0AagKlwQ4FrRvQIGoL8K/xVOgEkqC0dIEcp0rgDOkpkumL0i1abwYTCXxm6JiV

rjhedgFXZrjTksQfpdKr8Mhgrsc8UXcc8hqNtefnwpZUWhM9UWRMxHmW8g0XMWudA9kpKwZ85RKtqMMZP+SiRsoCck08+S1dC5nmOFQYWnzkMWnRcIVkVGRB/CNKgmaGnAaHIOBRysYp/SIogVEHQUFSj/gtlCsXm+eaZ1ixIBz6lGAOAHoglMCzUQ4NUQXs5pVkgFDZf3SyLR88ot6Rg3BN1PMQU0mBtPOB/gkUBGhnSGoXikhOk9pcIKZzvkXn

NYUXXNfvmSi/SlT+SCWO5UTnYqhCWpC9+721sQK5CwRqiDiOsEzCB6GKH3l+clJNvOEznf8+nm6NXoWABdt1gC3OrCS7VVgpldkqMLJFVYGwt7oFhgDEKYgJ6mhBcMKYwXyKCBMMCyXo5Ser2S+gBRgLsBmAMRxooGFnV3WZU/1RORAzLoNxxUwWBcAcAojNeR5s8dUxcOaplqPYqfgEJYORicrxyCVAIdBDo+FHe6OMwfnys5EqhCwHnT8+kcL8

6b1Q85IXAarUX3TiwLrS40WL6PV4FDgnmsMkGcECNZKxxvpcsSxnn2c8lqTLs9retCALQBVaW8AXDtKgDuWoBUXa/zjNhwLBOQPJR5K3S4Vpi7ZBdoxtUSa43OzNs+bsG445nds8dgXM3cLdM7gBqRceXViFTMBCadnJtDBnzkFQKzJvWNJCWTKYAMkhbUGFYWZbzMqLv+t81CcBooDKVzji/VJxHhVeiAhsoLA7JOlXL138BZsywHOxwFFwW65d

j0UgH7MopFCQWOB2XltU2KrToCXSi8SUjSxUWTS+b1r+aTmI83SVgtQqs4TnZtxWGu0ypiCAwPR0WZsF6RrWJjQ55awrPSziWGNRCSbHNuX3MwiHCBcpXS46XM4gNegR1jSMpqEXhlsxUSrMw+XZ2QS1bMzXbGiTtmm443bVK974PMziLyBU3zky/RFrs6mWIADUwwaOYraxGkhegBKADIBfh9AO8BBAIfVooIdqIi20xQUBBsuhkl0l8/40goPl

Ym4KpMHeOCheZa8WxVSnBrCeXBKGFpcmyxj1QdJnY5sGu0XizvmtS4tqdS/8W9S0xWDS5hKvNaCX2K82t7pdhrHpU+NyygPKyiv6RzLMWoxxSB782I8AsqMyNpKzbLZK+uXHtXiWc836WYZW7K4ZTfFtBJhh/COjRXQBfFVDMMdrgCLQT5ezQEusyQ2TsSrFFXktWS06kNNgIsVQBQA4ABQBRQIP0O8DcZNIPQBhQKL4tgNUQkqr9nwSpSJQUIAJ

gCnBlzwFhk5WHFnk1jeR1+BCYMVOE1Fibu052OaKp6kBVvJdvnNS2acCi/vnfc4xX/c8+7+y+oK33e2qJC2aXRyxaX3TgmsH825oDFDqka6mxYes+twQcwkp+qxCq1y1LUwlqlrkiS7K5Gi0dQy8nA2pZAh+wEvoVEG3BLUoGXCkOogVmi21JUFU12TpJVtqxCtVi/Vqt6k0BRgF6hjgMYoeZg9XEK2ZK6svUhRrJd0s4MAYADNnFoDEvxgssvpq

JTBKHGCHl+RIjlFM2DWZtPzLkc8jmqBqxnoa6VnOM4fmey8fn1tSIWas1tqwS8TnOK68SI8/dXo83xXXpU5xU1CiXOzCYsDVYnmtiVDlei38QxTI15yrDoQMSGlq/ppUB1IVv8bborj3rpNnsMjG8WAIcCk6+NgR2XkTlJGBcyiRXGDK6tnq48ZWPZqZX647Xa3y5ZXe5i1NLMQnW3bpnXMEEdmIM15mO9lO7Ls2WdUcOAAjoIT6HXE1jfukUBoA

CgSbILuAckbSAGAOB99nLqWwKS+QZ62PX34WcMlXBS4986VnWMH7CcU5PWyq5crV6wMCcU8JgKqwPX56zkAcU0vXA89vWWoMfWCc7nQz6wvXMgJjrIFtfWj60q40kGqqH66/8lXKJhbyxOyVgK/Xd6yXMddqVQ160q5FaMXX4yD/XF69ocaerodA8GA3MgES5qenpNDDv2M3EIA3MgI517wzbJOoHPWUG/oBfTf7BCQLRBt0ESqjrrQZ/Y6DA7jk

qWBIlmptqkQ3a7pUZ/Y8bnhNLYT2FOawrwBABQBQYB+68oQCg2iAWcCrQYG/oBMdSPFqmmPXmQCQAC7ePB7kGI2pwM/QRsJI2WsdjNehQiw5G02gBMBYaJwoeX1JbgBOnB3An/Do2CZLeh2KCzh5nAqAWiMoBowFSANG/SBtG0YteADY3wsE/4kgP0BjG3w3D62Owr4M/X3rt6dS5C0R1YYwcGeoCHzoA3zSqEQBn6EE3IADMCyBXaA/2EnYTsxF

pCaXiBSAGp9Im+6B4m0wBFG7E2+G3YBIkCn1mABKBeQnABqIek329L7hwYYThCQJw3eZmEBggFV9V+r+ALI+g2CG0VKUJLiHX5NU3k6xIJcnFuxSm2SKyRMBg+GyqSEadNdrqVGBPBGjgZDP6BgAHNkpIEAA
```
%%