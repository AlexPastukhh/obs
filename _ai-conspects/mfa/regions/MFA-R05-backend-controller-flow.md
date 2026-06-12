# MFA-R05 - Backend enrollment controller flow

Conspect: `mfa`  
File type: **verified region/correction transcript**  
Stage: **2 / transcript v001**  
Generated: 2026-06-02 16:24:51 UTC

---

## Direction check

Goal:
Close the remaining MFA Stage0 candidates after Stage1.

Done:
Stage1 processed R00/R01/R02/R03/R04 and left 38 candidates.

Now:
This file processes `19` sources for `MFA-R05`.

Why:
The cards were manually visually rechecked before marking processed.

Next:
After Stage2 review/commit, run MFA closure audit.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
ASP.NET MVC/API backend enrollment flow: view models, controller fields, pending secret upsert, protected storage, verification, active UserSecret persistence, and TOTP time-window tolerance.
```

Key ideas:

- The server stores the pending secret and protects it; the client never posts the secret back.
- MVC and API variants both use pending enrollment rows, protected secrets, and server-side verification.
- Enrollment GET creates or refreshes a pending secret and returns QR/manual setup data.
- Enrollment POST verifies the code, saves an active UserSecret, removes the pending enrollment, and saves changes.
- Verification should tolerate small clock drift with previous/current/next time steps.
- The DB-pending approach works across multiple servers and prevents client tampering.

Reading quality:
```text
Visible text was manually read from Stage0 source images/contact sheets.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
If a later review finds a small wording issue, fix that source with a precision patch.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-055, S-058, S-059, S-061, S-062, S-063, S-064, S-065, S-066, S-067, S-068, S-069, S-070, S-071, S-072, S-074, S-075, S-077, S-079
```

Stage2 local boundary correction:
```text
S-077: Stage0 MFA-R06 -> Stage2 MFA-R05
S-079: Stage0 MFA-R06 -> Stage2 MFA-R05
```

Boundary decision:
```text
Included in MFA-R05 after Stage2 local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-055 | IU-055 | `34226d57c3` | `MFA-R05` | `verified-visible-manual-read` | B) MVC (Razor) implementation |
| S-058 | IU-058 | `b8668b0b1e` | `MFA-R05` | `verified-visible-manual-read` | API Controller uses same DB pending table. |
| S-059 | IU-059 | `62c1c29259` | `MFA-R05` | `verified-visible-manual-read` | MfaController (DB-pending secret) |
| S-061 | IU-061 | `008af801e9` | `MFA-R05` | `verified-visible-manual-read` | API GET enrollment endpoint. |
| S-062 | IU-062 | `573d9aa313` | `MFA-R05` | `verified-visible-manual-read` | MVC controller constructor and Enroll GET. |
| S-063 | IU-063 | `3d84fbb1d7` | `MFA-R05` | `verified-visible-manual-read` | Continuation of pending enrollment update. |
| S-064 | IU-064 | `6131621df4` | `MFA-R05` | `verified-visible-manual-read` | MVC Enroll GET pending-secret upsert. |
| S-065 | IU-065 | `148627d551` | `MFA-R05` | `verified-visible-manual-read` | API request DTO: |
| S-066 | IU-066 | `da1f07450d` | `MFA-R05` | `verified-visible-manual-read` | MVC Enroll GET returns view model. |
| S-067 | IU-067 | `9b11a7a41d` | `MFA-R05` | `verified-visible-manual-read` | API complete enrollment endpoint. |
| S-068 | IU-068 | `f6e4c6934e` | `MFA-R05` | `verified-visible-manual-read` | MVC POST enrollment endpoint. |
| S-069 | IU-069 | `0e5934a56c` | `MFA-R05` | `verified-visible-manual-read` | End of API complete enrollment. |
| S-070 | IU-070 | `69500a7baa` | `MFA-R05` | `verified-visible-manual-read` | Tiny cropped continuation of verification-window code. |
| S-071 | IU-071 | `a22d655368` | `MFA-R05` | `verified-visible-manual-read` | React API auth note. |
| S-072 | IU-072 | `cc518026f4` | `MFA-R05` | `verified-visible-manual-read` | MVC successful enrollment continuation. |
| S-074 | IU-074 | `552ff88aa5` | `MFA-R05` | `verified-visible-manual-read` | How we add -1 +1 step (time window drift). |
| S-075 | IU-075 | `9880d53129` | `MFA-R05` | `verified-visible-manual-read` | Backend POST continuation using verification window. |
| S-077 | IU-077 | `a84020e08d` | `MFA-R06` | `verified-visible-manual-read` | Backend note: pending secret is protected and stored server-side. |
| S-079 | IU-079 | `9548efdf49` | `MFA-R06` | `verified-visible-manual-read` | Why the DB pending-secret approach is good |

---

## 2. Source transcript

### S-055 - B) MVC (Razor) implementation

Metadata:
```text
source_id: S-055
image_use_id: IU-055
fileId_short: 34226d57c3
image_file: S-055__34226d57c3.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
B) MVC (Razor) implementation

ViewModels

Enroll GET VM includes manual key for display only:
public class MfaEnrollGetVm
{
    public string Issuer { get; set; } = default!;
    public string AccountName { get; set; } = default!;
    public string QrCodeUri { get; set; } = default!;
    // optional: show manual key to the user, but do NOT accept it back on POST
    public string ManualKey { get; set; } = default!;
}

Enroll POST VM has no secret:
public class MfaEnrollPostVm
{
    public string DeviceName { get; set; } = "My phone";
    public string Code { get; set; } = "";
}
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-058 - API Controller uses same DB pending table.

Metadata:
```text
source_id: S-058
image_use_id: IU-058
fileId_short: b8668b0b1e
image_file: S-058__b8668b0b1e.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
API Controller uses same DB pending table.

Visible code:
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

    constructor receives AppDbContext, IUserContext, and IDataProtectionProvider.
}
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-059 - MfaController (DB-pending secret)

Metadata:
```text
source_id: S-059
image_use_id: IU-059
fileId_short: 62c1c29259
image_file: S-059__62c1c29259.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
MfaController (DB-pending secret)

Visible code:
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
}
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-061 - API GET enrollment endpoint.

Metadata:
```text
source_id: S-061
image_use_id: IU-061
fileId_short: 008af801e9
image_file: S-061__008af801e9.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
API GET enrollment endpoint.

[HttpGet("enroll")]
public async Task<IActionResult> GetEnroll()
{
    var user = _userContext.GetCurrentUser();
    var issuer = "MyApp";
    var secret = CreateSecret();
    var now = DateTime.UtcNow;

    pending = await _db.PendingMfaEnrollments.SingleOrDefaultAsync(...);

    if pending is null:
        create PendingMfaEnrollment with UserId, protected secret, CreatedUtc, ExpiresUtc.
    otherwise update the pending record.
}
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-062 - MVC controller constructor and Enroll GET.

Metadata:
```text
source_id: S-062
image_use_id: IU-062
fileId_short: 573d9aa313
image_file: S-062__573d9aa313.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
MVC controller constructor and Enroll GET.

Constructor stores:
_db = db;
_userContext = userContext;
_protector = dp.CreateProtector("mfa-secret-v1");

[HttpGet]
public async Task<IActionResult> Enroll()

The GET flow:
- get current user;
- set issuer;
- create secret;
- store pending secret in DB with upsert/single-per-user behavior;
- protect the secret before storing.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-063 - Continuation of pending enrollment update.

Metadata:
```text
source_id: S-063
image_use_id: IU-063
fileId_short: 3d84fbb1d7
image_file: S-063__3d84fbb1d7.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
Continuation of pending enrollment update.

If pending already exists:
- update ProtectedSecret;
- update CreatedUtc;
- update ExpiresUtc = now.AddMinutes(10);
- update ConcurrencyStamp.

Then SaveChangesAsync.

Return QR/manual data:
return Ok(new {
    issuer,
    accountName = user.Email,
    qrCodeUri = BuildOtpAuthUri(issuer, user.Email, secret),
    manualKey = secret
});
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-064 - MVC Enroll GET pending-secret upsert.

Metadata:
```text
source_id: S-064
image_use_id: IU-064
fileId_short: 6131621df4
image_file: S-064__6131621df4.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
MVC Enroll GET pending-secret upsert.

If pending is null:
- create PendingMfaEnrollment;
- set UserId, ProtectedSecret, CreatedUtc, ExpiresUtc;
- add to PendingMfaEnrollments.

Else:
- refresh protected secret, timestamps, concurrency stamp.

Then save changes and build otpauth URI.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-065 - API request DTO:

Metadata:
```text
source_id: S-065
image_use_id: IU-065
fileId_short: 148627d551
image_file: S-065__148627d551.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
API request DTO:

public sealed class CompleteEnrollRequest
{
    public string DeviceName { get; set; } = "My phone";
    public string Code { get; set; } = default!;
}
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-066 - MVC Enroll GET returns view model.

Metadata:
```text
source_id: S-066
image_use_id: IU-066
fileId_short: da1f07450d
image_file: S-066__da1f07450d.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
MVC Enroll GET returns view model.

Visible logic:
var vm = new MfaEnrollGetVm
{
    Issuer = issuer,
    AccountName = user.Email,
    QrCodeUri = uri,
    ManualKey = secret
};

return View(vm);
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-067 - API complete enrollment endpoint.

Metadata:
```text
source_id: S-067
image_use_id: IU-067
fileId_short: 9b11a7a41d
image_file: S-067__9b11a7a41d.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
API complete enrollment endpoint.

[HttpPost("enroll")]
public async Task<IActionResult> CompleteEnroll([FromBody] CompleteEnrollRequest req)

Flow:
- get current user and current time;
- load pending enrollment;
- reject if pending is missing or expired;
- unprotect pending secret;
- create Totp from Base32 decoded secret;
- verify submitted code;
- if invalid, return BadRequest;
- save active UserSecret;
- remove pending enrollment;
- save changes;
- return success.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-068 - MVC POST enrollment endpoint.

Metadata:
```text
source_id: S-068
image_use_id: IU-068
fileId_short: f6e4c6934e
image_file: S-068__f6e4c6934e.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
MVC POST enrollment endpoint.

[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Enroll(MfaEnrollPostVm vm)

Flow:
- get current user;
- load pending enrollment;
- if missing/expired, add ModelState error and rebuild Enroll GET VM;
- unprotect pending secret;
- verify submitted code;
- on failure return the Enroll view with error;
- on success save active secret, remove pending enrollment, save, and redirect.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-069 - End of API complete enrollment.

Metadata:
```text
source_id: S-069
image_use_id: IU-069
fileId_short: 0e5934a56c
image_file: S-069__0e5934a56c.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
End of API complete enrollment.

After successful verification:
- add/save active secret/device;
- remove the pending enrollment;
- await _db.SaveChangesAsync();
- return Ok(new { success = true });
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-070 - Tiny cropped continuation of verification-window code.

Metadata:
```text
source_id: S-070
image_use_id: IU-070
fileId_short: 69500a7baa
image_file: S-070__69500a7baa.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
Tiny cropped continuation of verification-window code.

Visible tail:
future: 1));

This belongs to the TOTP verification window setup around previous/next time-step tolerance.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-071 - React API auth note.

Metadata:
```text
source_id: S-071
image_use_id: IU-071
fileId_short: a22d655368
image_file: S-071__a22d655368.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
React API auth note.

If your React app uses cookie auth, keep credentials: "include" in fetch.
If antiforgery is enforced on APIs, add a token endpoint and header setup.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-072 - MVC successful enrollment continuation.

Metadata:
```text
source_id: S-072
image_use_id: IU-072
fileId_short: cc518026f4
image_file: S-072__cc518026f4.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
MVC successful enrollment continuation.

If TOTP code is not ok:
- ModelState.AddModelError(nameof(vm.Code), "Invalid code.");
- return View("Enroll", await RebuildEnrollGetVm(user));

If code is valid:
- add new UserSecret with UserId, Name, ProtectedSecret, IsActive;
- remove pending enrollment;
- save changes;
- redirect to EnrollSuccess.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-074 - How we add -1 +1 step (time window drift).

Metadata:
```text
source_id: S-074
image_use_id: IU-074
fileId_short: 552ff88aa5
image_file: S-074__552ff88aa5.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
How we add -1 +1 step (time window drift).

TOTP codes change in discrete time steps, usually 30 seconds.
If the server time and phone time are slightly out of sync, the current step might differ.

Accept codes not only from the current step, but also:
- previous step (-1)
- next step (+1)

With OtpNet:
totp.VerifyTotp(code, out _, new VerificationWindow(previous: 1, future: 1));
This tolerates clock drift, commonly about 30 seconds on each side.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-075 - Backend POST continuation using verification window.

Metadata:
```text
source_id: S-075
image_use_id: IU-075
fileId_short: 9880d53129
image_file: S-075__9880d53129.png
stage0_group: MFA-R05
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
Backend POST continuation using verification window.

Before saving active secret:
- unprotect pending secret;
- create Totp from Base32 decoded secret;
- verify code with VerificationWindow(previous: 1, future: 1);
- if invalid, add ModelState error and rebuild the Enroll view;
- if valid, persist the active secret and clean pending enrollment.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-077 - Backend note: pending secret is protected and stored server-side.

Metadata:
```text
source_id: S-077
image_use_id: IU-077
fileId_short: a84020e08d
image_file: S-077__a84020e08d.png
stage0_group: MFA-R06
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
Backend note: pending secret is protected and stored server-side.

The visible tail returns a MfaEnrollGetVm containing issuer, accountName, qrCodeUri, and manualKey.
It also notes placeholder helper methods:
CreateSecret()
BuildOtpAuthUri(issuer, account, secret).
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

### S-079 - Why the DB pending-secret approach is good

Metadata:
```text
source_id: S-079
image_use_id: IU-079
fileId_short: 9548efdf49
image_file: S-079__9548efdf49.png
stage0_group: MFA-R06
stage2_region: MFA-R05
status: verified-visible-manual-read
transcript_method: Stage2 visible manual read from source image/contact sheet
```

#### Verified visible text
```text
Why the DB pending-secret approach is good

- Works with multiple servers with no sticky sessions.
- Prevents client tampering because the secret never comes back from the client.
- You can expire and clean pending records.
```

#### Notes

Visible text manually read from source image/contact sheet; not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- The server stores the pending secret and protects it; the client never posts the secret back.
- MVC and API variants both use pending enrollment rows, protected secrets, and server-side verification.
- Enrollment GET creates or refreshes a pending secret and returns QR/manual setup data.
- Enrollment POST verifies the code, saves an active UserSecret, removes the pending enrollment, and saves changes.
- Verification should tolerate small clock drift with previous/current/next time steps.
- The DB-pending approach works across multiple servers and prevents client tampering.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| The server stores the pending secret and protects it; the client never posts the secret back. | S-055, S-058, S-059, S-061, S-062, S-063, S-064, S-065, S-066, S-067, S-068, S-069, S-070, S-071, S-072, S-074, S-075, S-077, S-079 | medium-high |
| MVC and API variants both use pending enrollment rows, protected secrets, and server-side verification. | S-055, S-058, S-059, S-061, S-062, S-063, S-064, S-065, S-066, S-067, S-068, S-069, S-070, S-071, S-072, S-074, S-075, S-077, S-079 | medium-high |
| Enrollment GET creates or refreshes a pending secret and returns QR/manual setup data. | S-055, S-058, S-059, S-061, S-062, S-063, S-064, S-065, S-066, S-067, S-068, S-069, S-070, S-071, S-072, S-074, S-075, S-077, S-079 | medium-high |
| Enrollment POST verifies the code, saves an active UserSecret, removes the pending enrollment, and saves changes. | S-055, S-058, S-059, S-061, S-062, S-063, S-064, S-065, S-066, S-067, S-068, S-069, S-070, S-071, S-072, S-074, S-075, S-077, S-079 | medium-high |
| Verification should tolerate small clock drift with previous/current/next time steps. | S-055, S-058, S-059, S-061, S-062, S-063, S-064, S-065, S-066, S-067, S-068, S-069, S-070, S-071, S-072, S-074, S-075, S-077, S-079 | medium-high |
| The DB-pending approach works across multiple servers and prevents client tampering. | S-055, S-058, S-059, S-061, S-062, S-063, S-064, S-065, S-066, S-067, S-068, S-069, S-070, S-071, S-072, S-074, S-075, S-077, S-079 | medium-high |

---

## 5. Open review issues

- This file is valid for MFA Stage2 because every included source has visible text and no OCR-placeholder processed source.
- Stage2 closes the remaining transcript work; run MFA closure audit next.
- If a later review needs exact punctuation/code cleanup, patch individual sources.
