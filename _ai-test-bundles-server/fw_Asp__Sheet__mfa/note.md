---
excalidraw-plugin: parsed
tags:
  - excalidraw
excalidraw-autoexport: svg
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
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
```
%%