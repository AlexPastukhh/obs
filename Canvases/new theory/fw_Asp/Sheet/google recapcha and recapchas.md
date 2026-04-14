---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data

## Text Elements
<script src="https://www.google.com/recaptcha/api.js" async defer></script>

<form asp-action="Register" method="post">
  <input type="email" name="Email" required />
  <input type="password" name="Password" required />

  <div class="g-recaptcha" data-sitekey="@ViewBag.RecaptchaSiteKey"></div>

  <button type="submit">Submit</button>
</form> ^dKwG9OmP

public sealed class RecaptchaVerifyResponse
{
    public bool success { get; set; }
    public string[]? error-codes { get; set; } // google uses this name in JSON sometimes
    public List<string>? error_codes { get; set; } // in case serializer maps differently
    public double score { get; set; } // v3 only
    public string? action { get; set; } // v3 only
    public string? hostname { get; set; }
} ^cGbM93OA

using System.Net.Http;
using System.Text.Json;
using Microsoft.AspNetCore.WebUtilities;

public interface IRecaptchaVerifier
{
    Task<bool> VerifyV2Async(string token, string? remoteIp = null);
}

public class GoogleRecaptchaVerifier : IRecaptchaVerifier
{
    private readonly HttpClient _http;
    private readonly IConfiguration _config;

    public GoogleRecaptchaVerifier(HttpClient http, IConfiguration config)
    {
        _http = http;
        _config = config;
    }

    public async Task<bool> VerifyV2Async(string token, string? remoteIp = null)
    {
        if (string.IsNullOrWhiteSpace(token)) return false;

        var secret = _config["Recaptcha:SecretKey"];
        if (string.IsNullOrWhiteSpace(secret))
            throw new InvalidOperationException("Recaptcha:SecretKey is not configured.");

        // POST https://www.google.com/recaptcha/api/siteverify
        // with form fields: secret, response, remoteip(optional)

        var data = new Dictionary<string, string>
        {
            ["secret"] = secret,
            ["response"] = token
        };

        if (!string.IsNullOrWhiteSpace(remoteIp))
            data["remoteip"] = remoteIp;

        using var content = new FormUrlEncodedContent(data);
        using var resp = await _http.PostAsync("https://www.google.com/recaptcha/api/siteverify", content);
        resp.EnsureSuccessStatusCode();

        var json = await resp.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<RecaptchaVerifyResponse>(json);

        return result?.success == true;
    }
} ^DERt1uS2

public class RegisterVm
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";

    // name must match form field for model binding:
    public string? g_recaptcha_response { get; set; } // for manual binding (see note below)
} ^z5Y6RMRj

using Microsoft.AspNetCore.Mvc;

public class AccountController : Controller
{
    private readonly IRecaptchaVerifier _recaptcha;
    private readonly IConfiguration _config;

    public AccountController(IRecaptchaVerifier recaptcha, IConfiguration config)
    {
        _recaptcha = recaptcha;
        _config = config;
    }

    [HttpGet]
    public IActionResult Register()
    {
        ViewBag.RecaptchaSiteKey = _config["Recaptcha:SiteKey"];
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(RegisterVm vm)
    {
        var token = Request.Form["g-recaptcha-response"].ToString();
        var ip = HttpContext.Connection.RemoteIpAddress?.ToString();

        var ok = await _recaptcha.VerifyV2Async(token, ip);
        if (!ok)
        {
            ModelState.AddModelError("", "reCAPTCHA failed. Please try again.");
            ViewBag.RecaptchaSiteKey = _config["Recaptcha:SiteKey"];
            return View(vm);
        }

        // reCAPTCHA passed -> proceed with registration
        // create user, hash password, etc.
        return RedirectToAction("RegisterSuccess");
    }
} ^8w72vnoi

import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY; // or REACT_APP_...

export default function RegisterV2() {
  const recaptchaRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const token = recaptchaRef.current?.getValue();
    if (!token) {
      setStatus("Please complete reCAPTCHA.");
      return;
    }

    const resp = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, recaptchaToken: token })
    });

    if (!resp.ok) {
      setStatus(await resp.text());
      recaptchaRef.current?.reset(); // token is single-use-ish; reset after failure
      return;
    }

    setStatus("Registered!");
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

      <ReCAPTCHA sitekey={SITE_KEY} ref={recaptchaRef} />

      <button type="submit">Register</button>
      <div>{status}</div>
    </form>
  );
} ^aGEGcwyn

import React, { useEffect, useRef, useState } from "react";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve();

    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export default function RegisterV2NoLib() {
  const captchaDivRef = useRef(null);
  const widgetIdRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const src = "https://www.google.com/recaptcha/api.js?render=explicit";

    loadScript(src).then(() => {
      // Wait until grecaptcha is ready
      window.grecaptcha.ready(() => {
        if (widgetIdRef.current !== null) return; // already rendered

        widgetIdRef.current = window.grecaptcha.render(captchaDivRef.current, {
          sitekey: SITE_KEY,
          theme: "light",
          // callback: () => {}, // optional: called on success
          // "expired-callback": () => {}, // optional: called on expiration
        });
      });
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const widgetId = widgetIdRef.current;

    // If you rendered explicitly, prefer getResponse(widgetId)
    const token =
      widgetId !== null
        ? window.grecaptcha.getResponse(widgetId)
        : window.grecaptcha.getResponse(); // fallback

    if (!token) {
      setStatus("Please complete reCAPTCHA.");
      return;
    }

    const resp = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, recaptchaToken: token }),
    });

    if (!resp.ok) {
      setStatus(await resp.text());

      // Let user retry (token may be consumed/expired)
      if (widgetId !== null) window.grecaptcha.reset(widgetId);
      else window.grecaptcha.reset();

      return;
    }

    setStatus("Registered!");
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <div ref={captchaDivRef} />

      <button type="submit">Register</button>
      <div>{status}</div>
    </form>
  );
} ^Jty2ecTR

controller ^LerHMToM

v3 must check action and score ^CSTy2CDu

combined v2 and v3 ^BHjEQOCE

using System.Text.Json.Serialization;

public sealed class RecaptchaVerifyResponse
{
    [JsonPropertyName("success")]
    public bool Success { get; set; }

    [JsonPropertyName("challenge_ts")]
    public DateTimeOffset? ChallengeTs { get; set; }

    [JsonPropertyName("hostname")]
    public string? Hostname { get; set; }

    // v3 fields
    [JsonPropertyName("score")]
    public double? Score { get; set; }

    [JsonPropertyName("action")]
    public string? Action { get; set; }

    [JsonPropertyName("error-codes")]
    public string[]? ErrorCodes { get; set; }
}

public sealed record RecaptchaV3Result(bool Success, double Score, string? Action, string? Hostname, string[]? ErrorCodes);
public sealed record RecaptchaV2Result(bool Success, string? Hostname, string[]? ErrorCodes); ^QFSvf69a

using System.Net.Http;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

public sealed class GoogleRecaptchaService : IRecaptchaService
{
    private readonly HttpClient _http;
    private readonly IConfiguration _config;

    public GoogleRecaptchaService(HttpClient http, IConfiguration config)
    {
        _http = http;
        _config = config;
    }

    public async Task<RecaptchaV3Result> VerifyV3Async(string token, string expectedAction, string? remoteIp = null)
    {
        var resp = await VerifyCoreAsync(token, remoteIp);

        // v3: must check action + score
        var ok = resp.Success && string.Equals(resp.Action, expectedAction, StringComparison.Ordinal);

        var score = resp.Score ?? 0.0;
        return new RecaptchaV3Result(ok, score, resp.Action, resp.Hostname, resp.ErrorCodes);
    }

    public async Task<RecaptchaV2Result> VerifyV2Async(string token, string? remoteIp = null)
    {
        var resp = await VerifyCoreAsync(token, remoteIp);
        return new RecaptchaV2Result(resp.Success, resp.Hostname, resp.ErrorCodes);
    }

    private async Task<RecaptchaVerifyResponse> VerifyCoreAsync(string token, string? remoteIp)
    {
        if (string.IsNullOrWhiteSpace(token))
            return new RecaptchaVerifyResponse { Success = false, ErrorCodes = ["missing-input-response"] };

        var secret = _config["Recaptcha:SecretKey"];
        if (string.IsNullOrWhiteSpace(secret))
            throw new InvalidOperationException("Recaptcha:SecretKey is not configured.");

        var data = new Dictionary<string, string>
        {
            ["secret"] = secret,
            ["response"] = token
        };

        if (!string.IsNullOrWhiteSpace(remoteIp))
            data["remoteip"] = remoteIp;

        using var content = new FormUrlEncodedContent(data);
        using var httpResp = await _http.PostAsync("https://www.google.com/recaptcha/api/siteverify", content);
        httpResp.EnsureSuccessStatusCode();

        var json = await httpResp.Content.ReadAsStringAsync();

        var result = JsonSerializer.Deserialize<RecaptchaVerifyResponse>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        return result ?? new RecaptchaVerifyResponse { Success = false, ErrorCodes = ["invalid-json"] };
    }
} ^EJhbIQr2

public interface IRecaptchaService
{
    Task<RecaptchaV3Result> VerifyV3Async(string token, string expectedAction, string? remoteIp = null);
    Task<RecaptchaV2Result> VerifyV2Async(string token, string? remoteIp = null);
} ^iWoS8QDo

import React, { useEffect, useState } from "react";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function loadRecaptchaV3(siteKey) {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha) return resolve(window.grecaptcha);

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.grecaptcha);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function RegisterV3React() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadRecaptchaV3(SITE_KEY)
      .then((g) => g.ready(() => setReady(true)))
      .catch(() => setReady(false));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!ready) {
      setStatus("reCAPTCHA not ready yet.");
      return;
    }

    const token = await window.grecaptcha.execute(SITE_KEY, { action: "register" });

    const resp = await fetch("/api/auth/register-v3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, recaptchaToken: token }),
    });

    if (!resp.ok) {
      setStatus(await resp.text());
      return;
    }

    setStatus("Registered (React v3)!");
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
      <button type="submit" disabled={!ready}>Register</button>
      <div>{status}</div>
    </form>
  );
} ^TZfUmVJx

@model RazorRegisterVm
@{
    var siteKey = (string)ViewBag.RecaptchaSiteKey;
}

<form id="registerForm" method="post" asp-action="Register">
    @Html.AntiForgeryToken()

    <input asp-for="Email" type="email" required />
    <input asp-for="Password" type="password" required />

    <input asp-for="RecaptchaToken" type="hidden" />

    <button type="submit">Register</button>

    <div asp-validation-summary="All"></div>
</form>

<script src="https://www.google.com/recaptcha/api.js?render=@siteKey"></script>
<script>
  (function () {
    const form = document.getElementById("registerForm");
    const tokenInput = document.querySelector('input[name="RecaptchaToken"]');
    const siteKey = "@siteKey";

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      grecaptcha.ready(function () {
        grecaptcha.execute(siteKey, { action: "register" }).then(function (token) {
          tokenInput.value = token;
          form.submit();
        });
      });
    });
  })();
</script> ^GftXzq92

without library ^fEofQA5M

with library ^ECzS5b1l

import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import RegisterV3 from "./RegisterV3";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function App() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={SITE_KEY}
      scriptProps={{ async: true, defer: true }}
    >
      <RegisterV3 />
    </GoogleReCaptchaProvider>
  );
} ^ZRnIsqIn

import React, { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function RegisterV3() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!executeRecaptcha) {
      setStatus("reCAPTCHA not ready yet.");
      return;
    }

    // action name must match what server expects
    const token = await executeRecaptcha("register");

    const resp = await fetch("/api/auth/register-v3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, recaptchaToken: token }),
    });

    setStatus(resp.ok ? "Registered!" : await resp.text());
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
      <div>{status}</div>
    </form>
  );
} ^Jsp39rLB

v3 ^QAg0Jyv2

what is remote ip ^22HbZZjS

we also may need to verify hostname ^LmPQ9q3K

so flow exp ^45wVsZqv

expected action in recapcha is just a string to put inside
 ^4y9dhzYd

and to verify  ^ZjCiyxQ8

so, we need to give site key to client 

1 razor - from config/env variables/keystroe => viewbag
2 react - just pass in response ^rc6Wld0U

1 razor -> we are loading script
in v3 - with our sitekey in qstring
 and in script tag we are manually executing recapcha,
with v3 we also need to set action "register","login"
in v2 we just set class and sitekey to div
 ^ZQWSVF3K

so here we prevent default and add event listener on recapchas token ready 
to execute and put token from resolved promise into the input and submit
!!! we can do literally the same with v2  ^he17DTxA

using form because v2 automatically sets it
can do like v3 ^hEX6poIl

## Embedded Files
f9658bba7edb3e014028f0d9869ed7997a2b28a9: [[Pasted Image 20260307073814_982.png]]

e8160cb40f66946f7f24580a1a05e872f52a11bc: [[Pasted Image 20260307073825_074.png]]

cb824d6d527a8c7ae80afcc0649a11fe2acc7620: [[Pasted Image 20260307074410_708.png]]

8a25bf12749b800bd1ab773a73a3264acbdf35db: [[Pasted Image 20260307074415_108.png]]

f75da5c7b121fecf74b539047860a96226990a65: [[Pasted Image 20260307074419_211.png]]

b820a46564f075a5f67da108af9da540965fb724: [[Pasted Image 20260307074423_567.png]]

fd486671e1f8ec7d4e6a3108450f9f26e3bcba5b: [[Pasted Image 20260307074432_074.png]]

a66355c0f6d70ce96429734b50d7d7adcafa1578: [[Pasted Image 20260307074438_427.png]]

aacb674df1e0b118ae48880065e33cbd04731391: [[Pasted Image 20260307074442_834.png]]

e44c43b1e3aa174e960baa077b4ab1f495a49f60: [[Pasted Image 20260307074447_642.png]]

6fe4a9a901f981a2120cddcc3555b37d40187833: [[Pasted Image 20260307074532_121.png]]

441acaa09716b78371f3623c8ed4176d5e2f4ea0: [[Pasted Image 20260307074541_104.png]]

17dbcfec02f470e411851b72dbffc884a9e58818: [[Pasted Image 20260307074550_806.png]]

491e6ead16a2dda74ff2529ef7cb65cc5f2c28ce: [[Pasted Image 20260307074556_070.png]]

74198633188b91d3d1287c41fe52c310b6dfeed8: [[Pasted Image 20260307074601_017.png]]

4ca6ce2a73aead9c53f719aa81654a6400293a83: [[Pasted Image 20260307074621_236.png]]

2223732f3870b863f742600632f411565d0b2e37: [[Pasted Image 20260307074637_415.png]]

9284bbd1a39585b853ae6a825caa161f227808ce: [[Pasted Image 20260307074647_159.png]]

7b6a52510df556d16ab5bbb94d084e69d4c4d7c1: [[Pasted Image 20260307075635_470.png]]

36f3511602c8ad2b0730ee9469431b01af585736: [[Pasted Image 20260307075640_176.png]]

ed2562ff650a90a6da4177e8c45df20ac846511a: [[Pasted Image 20260307075646_169.png]]

12d765e0aa0d93c2cadba01bb2a95b4fbce709d6: [[Pasted Image 20260307075649_586.png]]

f6ad5f530d94f356e53a65ebb0e5fe22b7f122c6: [[Pasted Image 20260307075658_172.png]]

57543bdebbed040cf96e2be644dcb26fd772ed5a: [[Pasted Image 20260307080011_042.png]]

71ca45a8cbed2618114e7b23d06563d94bab2666: [[Pasted Image 20260307080015_583.png]]

4045ab3e38488e412fa7d60ba56f4a3fbda459e7: [[Pasted Image 20260307080019_705.png]]

5df0120e54993e09c63915046d4ef129385d0548: [[Pasted Image 20260307080023_411.png]]

c8ad56551810478d1a6e85b44e207c602626bfd9: [[Pasted Image 20260307080032_031.png]]

8a78d8a2e77e3435fa861fcfee444e4d62dc7bdc: [[Pasted Image 20260307080037_609.png]]

e5e67961df1f793f0a9a8eaddef39558a393dd35: [[Pasted Image 20260307080046_060.png]]

93bcb6a0f47393b80c4f7c952a6a82952d35a225: [[Pasted Image 20260307080107_590.png]]

dfcf1d992b0a1598b5ee829988d52ab71e360463: [[Pasted Image 20260307080441_233.png]]

c910e3d342d7733168e65c8dbb59dbef39a3b471: [[Pasted Image 20260307080830_628.png]]

64f6dadd1748f0e5936f2383af3a388969663aa1: [[Pasted Image 20260307080835_428.png]]

aaa623e1bec7ce9c315747eb7cb500806b813ca0: [[Pasted Image 20260307080847_330.png]]

fe9b8d420db4d133719a79281f4aeb29cd43ab68: [[Pasted Image 20260307081257_954.png]]

0377a7b6bf192cf78e968d812558b3552b8cbb0d: [[Pasted Image 20260307081300_932.png]]

d5f7db3e51f1ae71a83c26a4c95253c4654453dc: [[Pasted Image 20260307081307_485.png]]

b03dad2933713c4817bc1776d7dfea6d596b5bb2: [[Pasted Image 20260307081327_087.png]]

922655f7ebe92d0a41127588631570495580ea15: [[Pasted Image 20260307081458_664.png]]

c9634f8ae42246278cd7bd0750b1268d835df2fa: [[Pasted Image 20260307081636_966.png]]

08335898c54c5ff18ed25ce4d0d2e02e022a4781: [[Pasted Image 20260307081642_985.png]]

7e069c249a4c1e7c48e62e23ca91208d06da236a: [[Pasted Image 20260307081647_356.png]]

3bc3b96c382c2a5bab1dad8c9f0ae64b1062dc9e: [[Pasted Image 20260307081957_466.png]]

24515e4b559b392ffaddef1d958fa79869830f89: [[Pasted Image 20260307082002_537.png]]

62066000dbc3731205d77b341995d4f97e6fc074: [[Pasted Image 20260307082005_793.png]]

1d46b7e5b1b6f0cda511433a51bc42aae40bc9a3: [[Pasted Image 20260307082012_292.png]]

23a1c334dbee39c689c5597b870230438ec46228: [[Pasted Image 20260307082020_339.png]]

2105b1805886b7131fd81cb4eae6f39251ff2c1b: [[Pasted Image 20260307082024_200.png]]

cd3c4f4a5819228381a2f511ce3601edc8185780: [[Pasted Image 20260308035751_976.png]]

e919c6250f0e6d18d9db9fe0b477ae0715134d95: [[Pasted Image 20260308035758_194.png]]

c0faa896a34cf768fb948dd1fa4be6fe7ec4378c: [[Pasted Image 20260308035802_618.png]]

a241470337e63e2f394887b4a2c8eb8f8d45f866: [[Pasted Image 20260308035810_971.png]]

5f83ae2351c0247bfc124b5de60d299666fe05bb: [[Pasted Image 20260308040210_319.png]]

7556f9f5db0914f48961b6c654e8f340699cf909: [[Pasted Image 20260308040212_805.png]]

a9388e5b5be8eb9fddf3aa2205bd3d43f64435db: [[Pasted Image 20260308040215_518.png]]

c1a27979d9e27992d696b3f64958439538ebad4b: [[Pasted Image 20260308040218_661.png]]

48461631e971397bdfd67ede728acbdf60c9133c: [[Pasted Image 20260308040221_815.png]]

d93e896685c6f178a5591c4abcccf2528b001bcf: [[Pasted Image 20260310223203_968.png]]

4cc3af8814f806f9a4b606524542a1dce3f98f31: [[Pasted Image 20260310223207_384.png]]

330d4855292d96a3af4bfa5f245a6befb7e0e792: [[Pasted Image 20260310223210_036.png]]

e75d68b5ededb1d154b634f46f43dee2ad943624: [[Pasted Image 20260310223213_174.png]]

81987b324db6e4c3ca1759396524431e9e58366d: [[Pasted Image 20260310223216_699.png]]

54feca23b3d34c83cba8fb6429596fe0e9076502: [[Pasted Image 20260310223221_319.png]]

7b96c085226f4955817c6c1359ec164eef8c1f43: [[Pasted Image 20260310223227_022.png]]

808ad7a5b6047332f9508cfba70cf4f38254c9a6: [[Pasted Image 20260310214130_487.png]]

022046bc2896e806af78a5569606c1f3ee9938c8: [[Pasted Image 20260310220249_189.png]]

5f3b130830c76acf21273f376d9ecbbdfd93d8e1: [[Pasted Image 20260310220320_106.png]]

11c2c536aebde7decb4ac927bbb024bcad7c7f51: [[Pasted Image 20260310220407_431.png]]

b571fc93fa14169bba813a2b9c53059f49bbde9b: [[Pasted Image 20260310220409_963.png]]

cf2ee1745640bce17769605fb286536993b505f1: [[Pasted Image 20260310220416_744.png]]

1442f15f8ad747800b3772d841365a7308552402: [[Pasted Image 20260310220442_114.png]]

db9c65bbe3649f64ab307aae35443322beac1e39: [[Pasted Image 20260310220827_046.png]]

06fe7ea8d0af0d542e7a4a91ca9582427796dc7f: [[Pasted Image 20260310222850_269.png]]

fd3a0c5a43c7e95d1c310afcf1157e6159cbe382: [[Pasted Image 20260310222854_250.png]]

faf2b79fdd017adf77657de048a3e3a1bef7194a: [[Pasted Image 20260310223025_137.png]]

%%
## Drawing
```compressed-json
N4KAkARALgngDgUwgLgAQQQDwMYEMA2AlgCYBOuA7hADTgQBuCpAzoQPYB2KqATLZMzYBXUtiRoIACyhQ4zZAHoFAc0JRJQgEYA6bGwC2CgF7N6hbEcK4OCtptbErHALRY8RMpWdx8Q1TdIEfARcZgRmBShcZQUebR4ABm0AZho6IIR9BA4oZm4AbXAwUDBSiBJuCAANBIApZQoAUQAzBAAlADkASQB5TETMgFUOZVq00shYREqiDiR+MsxuZwAW

AA4AVm0NgEYANhX9vZ2NhJOePYXIGGWAdh21le0ATlvkhOe1neeflY2Nq4QCgkdTcHbJHi3bTHNbPZLg457BJ7Z6AyQIQjKaTcBKA6zKYI4wHMKCkNgAawQAGE2Pg2KRKgBiHYIFks8ZlTS4bDk5RkoQcYg0ukMiSk6zMOC4QI5DmQZqEfD4ADKsEJEkEHjlEBJZMpAHUQZJuHwigJSRSEKqYOr0JqKoD+Vi5sw8mgdoC2FLsGobu6ErizRA+cI4

F1iG7UPkALqA5rkLLh7gcIRKwGEQVYSq4BLa/mCl2RkoTaDwcS8M0AX2JCAQxDBFw2kJ4yT2yUBjBY7C4aE2HaYrE4HU4YjBKJb4Pu6eYABEMlA69xmgQwoDNMJBY1glkcpGY4ChHBiLgF/X3bc3idkitbv9wYDZuTk6n8A+2DzF2hl/hV0G4GwM1yAozTAQoJlKQNwLABIQNjECwPA8FIWhB44QRfZkVREDoNgs04JLElpSgAAhDNHBGZ80yDbJ

iFIwUM2USjXyDQjSCgABBUgyQodFcDPVAUyoksaM47jeP4wTmJLf98BgZROCXFcEDRUIABUsCgAAZDMny/JSimrIpi0gCoJE0xoqTWTTBgAKypZQZ3JAAtFZJAAWTc54c30KhASmctyn0aJ5iDJY0GcZJYW0C9HhWFZngDP4eA9IM/VQZw9jWHgtg2OKbx4SENj2YrAWBYhQTQOEsJLdFMWxNAeGeFY8RGW1ILKXVLWFelKnFDhJWlbIoG1LkeRD

AUhVpHqxXIfqpRlYa40VFU1QC+162JC0DSNE1Nr1K1Vsqda82EZ1wkjFKSy9blfTBANAXGsMIwKfCynjXBEwkl900zML0FwHYTomwsmJrT9UHyr4dluFt+y7BS0DeOHBw4YcOFHBqEjWe5nmOV5pznYJT0Un9lKDdcJq3TIhr3V7IEPY9ifPS8NmvW9dnbINH1Brn30pfjv1/AioigIRIwgRB6IopbgiTCRmlxjY1k0LlbjrTRkgQM4VgSHg1maB

JiE+FE61uH5blwHhND13Bnm1Zh3HLBDSkuiYdjwwFsDJOAeZqtSNO0jhdNQQWEAMhZjPKfiICC5wAAVNNbbAADFlUIW446qABxBIjAAR1qTS7b8stKkIILlBCks/tWLH4g2GHbgSW5sfitY1kBNLnCb7HtHi/YVhRVmVlbUqdt7H40QxLFhoa68WoJct2vNfbutFdA+oGhaRu5Xl80mkVetmrehu1BUlWtW0dVpB0WK2hBDXK40Gr2y1L7Wm+NqD

J1JBB91PW9Ldf0y9gz8ierTOMCYEBywEt9IMZEswSEtkDAs51fYdVrPxHYDw8pthOMjbs3B24EKHCOcsDwmyQiansW4BN5zg1DmuDcxAqY7iAmgfcQYGYnnBtDFmbM7ycxLNzNAkk3wfgFkpTaJ4xaVEluRRiMtoHRwQF8JE2BNA62aMVahzRbjNB4H8NYCQAY5g2KomGzQmwAx2JobA9tHbAUQlcMA7sJh0wgF7L06DICSH9pgLSOkSZhHDkZeB

0dsFVEaBQZU+h8AJDjnAKo+A3I7A6BwLOPp8Dan8mXCuVdFjcGeDsaE2Nkis2OMkC8SNUrLCStoduyJEhVOwQ3ZqQYyoVVQAlV2vjp71V4KcBebVX6UjXkfCU81T5rl3uNQU4yZqTMGrKGWK0bQfy1KMh+49eBbPfkdT+QMzqujBAAm6sA7ogMeuGCBQZ3qfR8eUX62ZUiOmYX/WBQkMHg2eP8JWpxykkJ7KgB4vSGADm7GjDG3TEo0ObrQ+Bs56

GSNJkwym24aYvQPEeHhWCLzwmHuze8XMgmiLgcIvmDCpF3xkeLeRDEz6KmUZUDRWUVjED2MQJsFs1jYAtqokxzRsDYGRPFGxrQeDcj5XsRIDiCBOxAr01xHsgxeJ9mSr5vj/GBKDsEsOpRDKlEjqZdAABNRov9mj4C6DsGy+pVL4FNQACWIg5KkTrsBCByaXCQ5dgraj+rcJ4PTB7xUOAlWGtTwq3D2FsBKI97gxplSsbKY8n5EJKkGWqM8TT4yD

PiEZd9V5TXXtAY+UyVnk1mfvBZG9y3LMWnc5a+yNSHK2Y/Lppphb7RbXaNt39Tq/zQf/IM10fQXOAQ9MBNysV3KgTAsR8DnlIJWCg4gHzF0EUwUQmNkUDi3iBWCR4QKoXkKqTDSKbM6FEypai8mzDWGYo4R47hTMQX4qvDeQRD5SWfKkmUOkEi9XSNFnSmiDKlEwIgGsS2GxNDNB2JCeKmhjEJE0MQHYuBND4twG8XAEIDjcnQ80cpxBNByttM7V

xLi3GlA8Wqx5fjmDqQCYHYOodQlGvCZUKkxF8BZ1UjwQgyoehOrzsRDYbRNJ7HYo0KoNkbgl2mL6/JAaiElJ2IcC45TXgogSPPKN6VEPXmiheP4cJ4StmOGmrpbwthVIKg3GNisLhTzqrPCGWUUiIYBPm1qS8tm1rLUs7eMyxo1pLRMuaDbGUX0Oq2zZRbLQdufrspLlJe3X0SyWH+HywVjqASC+6QZrnPWfZAj6zKNX/pMsu/6Gw10bvJd8rBnx

NPXhRNVMonYUZHt8yWHrkKyF3USL8vTYLCBIpvSioWnIH0Yt3LOksr7eEfsJd+klurqviP5sBmloG5Hgelk22W0c9EbGPBsPlmhEM7FaNgPRKxNCs3jS3JEtsZUXB+CY2NFGFXOMVSqksDHttZu1WxvVnHijcYkMRAAavJIqFB9TEQSbUU17Fahw7gDZVGeQlMBT9ZXNTaBY3aA+Bsb7DcqEFS69cZY0MHjQkapZuK569Y2dSyiEp8IjHJH5wL/n

bmc1oHWHEeEqa/OLyJOl6kkXFnRdC1W8LzCgubwrY2ks581lX2Ou2nZXaOr30y3rgdfgh0nJHVdQBE6itXOnWVqMHj7lVb/T9YgiD/p7Ea8Ot3LFt1oH+TQ+EvzD3MxPcN3s/PdbfGvQgN9jD73oupot8rXCcVvr4QSgRHMf1bb9xSoDek73C1pYdqWiiTuu4gChxIuBB5FRWAbW8uANjaNuMeHYWNcAK0uzrRWzRsOGL+04t2NGgdlBBwXsoTGW

M6vY/pA1EcYfoB4qa4ixFeW3BgMQZoABFfAtQnLMCdZpWokhk7euU+gInBTIA1z+NobBmVYSJBOIhinndlgFSZzQmh3xsEEgiowVOlUtik6cpB+kPN1gwUC0AtZc1d60lcSxRo95Vd5c60QtpkTsdcNlb5u1ksDc9l4s+1ssyhctfd8sbc0ou97dQwZ008td50vpNUnkPc/oIBcMfdLdp8BAA8QUykmpPhAUgxBsEZ30hFusIVSF0ZywmxNhKdoZ

JCTIpt49b1ZtIAKZNwFt2EndsVGZVt+Ev1c9Ntg5N0ANKUZsyZS8DsJB6VjstcmUoNmhiB1hip7hWRmg1gEA+VXCEA9h8Mu9HhTgFYDE9gEBkg7EuQ4MR8OFFVx93FPZvZGNwdf0OMl8wkSwTUIBBgABpHoGyQgTQKAXfckXIwYIQNYJ1NyJyAAfRgHoF8iDFyRU39UBBrloPJyAJig+ASB1mbg7kM2cEMXWCf2SgpzeC+H+HaRLFAKKXeBeB+CW

OWKWOFwGWSlgP8xlwILGQwOC0V2wJQOrXQMPgVxPkrUcLi3WQOTIJXkIPTRfllxN37Ry0HTyzOXHRoOKxLFK1uSYMqwXWa1q3YOzDWG4MjHML4PBkSD+FjUajBTEOBX2H6ykPhlRkjxBVeEODOAOGUPKFUIT2pRQPmxT10M4WWwz0MOz2MOJWEV/UhIgEA122Lw0J1BFlkTsKO0r0uOr1wGKnKSuwSG0WICbjEFxhTVeGvGe0Ng7wtmIDwGXBOBb

liKjHiMB0SNVWSNBz9mYwDjSMXzAENWhyyOjicj33LgSGYDWD3zjg2FNQKiMA2B6B2DYB2EwDaCv0J1U3aIZ35waSalZnBFhObggK7khGOG2BvCDPHEQ0uA6R2R6TWI8wuDjJLDgO2KN2LVOMwIOIuM5GOImkQKwLzPlGbRIKy3wMzPuM7WIOuIS0rMgAoJ4KoPOS+LoMPAYL0LnQBJYJqzYM904OLjN1QR4IZLCF4T1mxibCVgRQG2kKRPigj1k

LBCKkeEVkXMRUJjUKsLRW0NJL+LKBWzxSMKJTxJEV4MZMsL2xsI5PQHsO5LeicOjlwCIxoXZQQy1huweFwAQHWEaWRHMX5w0WID6MvGSGKRVKoyVVozAHoy1IvNnz1Pz3SMNOXxNMqH1j2GVGaGIgQCMCgCzj31wCqFyKEFuA4CsTCE9LyTaNCgZ0fwbm+D1jaX00MTxK7n52ykWIsyVN1iDU5yKWbiTO4BvDxPTLQBAU6l2OzP2POM13zJV0LL2

PVxi1WWeNuLZP2hS12iePLNN1ePN3eNHWoMuSnXoMd3JLemYMeQQQ4NwHYnBMeXHP4g6yDQeBoTD0xJRMgERNPQbCDIKlhAmwJPUOsLm2TzYQPPpkpOPOpNPLzzMKBMvKLxDiJKNzL05Ir1i2r1/JWGwBHhuwiJfOhhWAQFxjQxfPhU0Swzu3ig2Hr2eG0VzGJEcTiIB0Qgn0gCnwZMQtY31NJih2NWjmeCpFqGIk0mVDtSECdRWE0iEGeBgEkDY

GSBsjziaJLBaJv29LovCk0zWBSEijM1FXimSi/3CkijimhCRB+B0xlWTQEsRhlTGI+HuGyhHmmOEtFy8wl28s4K2IksC2UqQMOIUrQKUpkpUuQMfKuN1xeKrO2geLSx2IOjrNIIbIgCbIug+MK1oLMo7Isud2su1LKFsuzGIkcuJqhP4mSnAtvBlUnlEPnIbF+t8oxN2E+BhguGCq3MJJL3Cr3MiqW0PJirBDWxz1pIA3pKSqZNCpA1vIli5Oyqg

z2FaBWFtltjOAVi+Etg/2wGIHlOwAFLgyqVcLOGxjWH50grVI6o1OB3gp6tSOQoNKNKGsqA4FwH1EGCgDaDWFSVxxslUiEBIvIE0mwAfMmB9S2tourm/xTWimwUCsYoeA+EGJLC7hTQOCusakRGxgDF+rmMqljyzSgO4EiggPEtQEkvviLNzPks0ILPmSBuLLrogG13UvRqku2URsNzuIyz0rhsbLeMoOxtt1xpKwdyitbqJovNJqQSpApovOcob

DsyRH7k8vBARPnL8vdB1iDQts2G5uRWvP5pYR0MnqPNFpPI2zpPzwZJlp3P23lvvKVujjikwzwBzFeH2GwwtvuBIxlWSGwG8NcOhk5XMR4GaFKpzCtvardk6s8XtqSt6vn0hwyK43QokCEDh00AoCdUwxnA2A4E0B6FICzjaFqISEIAoBsnoGotaOJx9PCmyiSADAeHPSai+AuFnLKHTovBKSnIOGhmNhqVmJ2TNmeD7jDTWDbDOFbE+E+s83Fx8

2GXgORprrkp3kUsbohuBpLNbrLNRorK/mRu0seORvbuMfIKHubJHrbLxvASFvlGnoZNnv+hnAXrHP4KyleCQ24Z8qZvdEjTnLRO3tQFevEeCLj15tZK0NPv3McYgAvuZjiuvsltvulqvJZLCvNAyrvMVsgwiQ7zsXu11kgabl/OwQPqHzI2aCFXbjVueAQCVi+DBJavlVHxdgSLoySO8UpqkEdoXwGrQeNJJuji6FUjch4CqGlE63JBWCgAQxWBg

EoagCqDoajoYZ2vSghC2BTWMVxmKh1mbDOvSl2DbAaWkb4uRK4Yeu6QhAUaqTEv+srsBp0ebs0bBu0emhzI0bUv7o0s7tMaRvhpRtho0sxtOWMtbNMvHvMsnpd0BNYNcc4MaA8aSqXvdCyn0yvCnEZrRIbBmNRJRlCYbgtpevAqidlqTwFqfS7IpIMNis/XitMMeXvuPpydsLyayoKcqH7n8JCAwwCJ4H1twybwMSbEab0Q0VjWFTbx4GwD1lHDa

co2trgdtsn0QdYOQYhyycGpXx1B5HwCMFqMlVqBshnH1Ccicn1CzhvEwGYHnoJxos2ZjvOtygaUQ2MUpz/OMT7CGKKmblM1FTes+GKVufKoUZHhAQrqrqzO+dko1w+bmQPnjchpBtLJhrwMsd7q7prN0sMf0qscMuHqhc+JhZ+InoSYRd7PdwHNwEvzeWBl908fBk+zbCEIgMRLBFHjxeJYxLiiaibmKT8fxJ5qpeJIitpao2MlGcqFIBWAqKEGw

BnCdWGL3xtZ2C6AaAgecHsRcQjuv04K4jYCoBAkrHgaSffSvpMJvsStYLZayblrA25arygzcuNn5weGVmKWIGSAwz1luHyruyaflfhDQ05VaDrFaZYlatVNgZdnge6qQYGdQdQsyNnYkFyI6FIDcnJGVAQDYCgGwvwEaGICMH0FwuVD2D3eaMjsCmjsKXOvhG2EMQSjbCCsahHa7iVkDbqt2AAvKRbnDdhAUf2BHZjdedTd0ZbtQOTfUcTb+YLYH

s0urNSx7pU77qU/BesaxtLZxu+LKF+KrecaSuRdwCzjRdYIxYhk6zNiEfXr+CXOhUvX52xjbEpYfonZpdTzpeFoZcvpSZvbSbvb7IfdSr5o5afvydfdfrwGo4QElTwwFeeGwFZj0W+BfLUVyj5P6JZ1wAtpgbH3VO6c1N6YQpQ91eGddokAimwvwuIFUnoFwCoY6CzmaHJHoGUFI6WCdfobvwgAf0pz7j6PDNjVXqFyGOOH2BSADBoRbn0yKjxIL

tQGxhHezXWMOBUYzJzfk9UuV0+ZTdLTTb0bbv+Y7vviBfU87osaOQt10+t2hcnVhfxvhZM6Rbq04KdUs77Os82BjSxgShHa7cqiB63oxM0201AaAI8/ZZrxJMFsYL89xQC6ZdScgHPLvsyfC9ZMIk5YVpfZ5KgwKhbDeAgcOrQ2keSEewuFm4hEgdaVjRAutgiNuEK86eK9gp6fVXK91L6qdqGbQ/QYw/QGUGeCznJA4BnEaHJHgEIDzkwFICqGV

CqCdSzmeFUnWfo5dcY+2bhD7ibGRD6LOCbgMzTuWAOF+QaTM3PRvBvFjVube24pWJWIeesyl0LTUabtrqTYizee98U7BfO60qIPzcD+zYxp08hYe7Lae4rbheM57Jso+9wC6G+7Bn4hhgAOSlxeCd60CdTqJaG2XJ3o5gDYPU3KPsfepbiYR98+iv8+SdR6C/R6lvvax8TxvOfYURfsqGeD1ie3Q0w3Av+RQ1Zh/ICKyiu2KuOAMUhF9aVZg/aba

qK5tpK7trK4dt55Qcq8F5GZMmjnncXeXdXZ4HXazk3e3eaF3c1+lG4hJ3SmOF2bOCKleF+XeCqROecFymY/f+YtbEAIL6QBluUZPuMxXuB7NGKRUUTvtQpxcMTgvyc2upwk4IE9izIVkOgJ94nEpO7zAPlm3tgXcQ+5jM7uHwhZW4ygBWUegZ0gBGdEeTjRPn0zM5jBG2I5IsCBFLDX4eAVYdPg2D76nAvgOfQvuIS7zqdWaxfIrKcFAoypD602W

HrE0fQ+dLK9fZHo33WzN9GSrfULu3zSqQB/wgEPcPBGwjLwIIsEFxFRjAAgCIB4AsAScFTLgRnATOWAf/kpwzksouEdVjkzYh0Ru+fTGiF4IZRoAZ2GAHQlBgdjkgjWJrXAGawtZWsbWdrB1nKEgD6A2AHuMuP1BIB35SymAOsHHAAiyhl+EwJIMlFxiGJxGjeSYsoQggpBMo7we4NI2wR5Rkobg4Zh4I4jHseIArR5CJDaHiRswbQ7UEEHXAUBx

2M+Crtj31S79qu6AYgLkQoBq8eg+gOOJrwXABJ7+bncnKzDLqxpdY2ULjssH+DFQXgBwYPFVDhDqdlut4EpEUJTTghpGtQwAZAXcwmghk7vVRiCyCxoC2Q/XWTr72wH+8cCN3fXN3VrJh9buRlaPvp3bIONaBU9egTPWT65E0+/uXhHswoR8NPKCUJzuQiqixoQ8v1SbGO084n15BZJF9CLRUHi0zyWgiLtAA0iVAAAPA7FICEA4AUAVAMwFEAAB

eAADpSAZAcgRQAoAoBCjtA8kNgIvF0AGAFAgQPACyOwB+IFAuAOAIQG0A2RmAPI1AKEBgDoxUAHuVoKQAAB8dIhQIyOZFQB9RXIjgBaLpHNB6Q+gDUZKGcDcgoA3YbkRADaAIBVAJIJgOqKyDqBkhro/8CSB5HmiOAqAVAHSIzBwAhArI/yK6MyDNd8A6o92lkFdGNAgoiodUYEDzhCBCAgQYgKgAUAhiwxEYjgFGJjFlgAxoQZgBQHpDEAkxlWV

0XHCrE1jSAdYiAKgCzE5i8xBYkMRaOLGOB6AqAbAPgCrGujlAzgaUYqKgByjcA6oxmLgGcCsAFwlIGAK6IAACcOQgAgAoDERog2gd0TKOnF+I04C4XIggBgDBijRA43saGPDGaBoxUATgKgFjE8jmAWgfQGoGDHKh3xagI0feJkCcAQxRom0aQH0D6i8wlAOfPSJNEsi2RnInkdIFkDyAlAQoigCKLYBijggEowwJONlHyjFRyo1UeqM1HajdRTA

Q0caK9imibx1o20faLgCOjsAzozgK6PdGeiFwpAH0fHiWrEAAxbAIMRACLHhjIx0Y58RWJ5HxiMx7Y5MQgFTHpjEx7YzsbmLrA9i+xwk0saJJfESxmxtY+sSmJ5FNjXQLYtsR2IQDZjlJ+YwsRaLUl0iBxQ4kca6DHETifCU4mcXOJPALilxCAFceuM3HbjdxygfcS5Lwm4ATxCAM8ReMElXjCA9AG8cWP/GPjQxWkt8ZoA/FQAvxP4qAH+IfGAS

rRCgECWBLPicAiOhAIwOWESBxhipycD6IqDSi/VlhHEIgMoGBSMkEAzQFup2GdHuB2ITUlqY+J9iexipzXOYKQERZ9l6QmIDMAQCgkSAGRVE2CeyOwCujEJ/IlCcKNFHii9AOE4KUeNwAKilRKotUe2JInYAdRbU8iUaJglmjrJHAWiaBPomMTmJHAViR6MmwcSuJfo3iTyMDHpTBJNkkSeWMQBxj5Jek2STyLTEJjMxZkrsSpKsm3iSxZYsSUDO

+k6TWxoMxsajJMlKTuxcMmyXZOHGjieR443CbtPclRBFxagbyeeN8lbidxe4g8a5OPGUyIpl4hQNeJunxScpSU8STqEykZTUpv4hQAlNym3T8pto8CXiGjFsB3RrAMqdwFJBCBsm6guYE6hLruh64KkLfjqzGEJUmIerDBugGwBZxNAnkZID0Acq9cN4tIxht0iKjRQmoWMXYGbDeBwhP+4aEpP3ncpv5jm8ZRGpTwaSU5sojUbOlOQUaOYtuANF

ATJQ+EYCwsB3XblDQza4EbiQfVTjpSIFad0apAkFLY3LaGdK20I6tknxBJIJNIiIrdODEHgJR3gRQzykJ17ZF9oUmwT4MiBRB4l8RlfHWdX2JHn0yRV7QLhLXR5UjWSDUuRFoCICnSwg8qfMQTNdCoAGZIUuHEwEIDNAYAMs/8P1AQAWjgAaksMVGM0ATzUA64WkGyKXZiA55wAVAJXCgAABuNkfHjvmVhd5qAfeYfN1AMQYwAAflQBMAyQpAXds

kPCCoBL518u+WEFvmoBKwBYhQFfIwmLxUAYsIBeoEmwCRKsqADMKgFqAiYOgbIgwPHnLjhBn5r88wKgG0gkgGRpIBiPqO/m/z6QtRPQB7mYDAKr5D8++RAqgVKB0FoYvAGEHvlMiCApUpgKgCChyAdRK8vUUNFkhELx5JC4gMIAPkIA2RegQIMwtAVsLH50C1APQGSCoBOAUi28XvJkWTzKFIwb+U6O7CqLWF4CjRZwu0W6KOA+isMYYoPkkL35p

i1AEtRJAyTLFEC6xZAotGVgIJFAGaXeSMX3zp59kqsfPJ2kzil5TI1eevM4BhBt50ilxadOPn4BT5wqc6D4rAWsKn5Bil+WErcXKAv5P849v/IYVAKQFVi/JZoo2nBAEFYQJhcgqYXeKMFWCnoDgsEC+iCFaowpcQtOlkKspJS6heUr/n0LAFTCmpb4rqWcKMFPCxRWEH4VEAyppAYRYqKYWOBamTASRReIGVhK5F48pZcosUUzK8l7CzRXYr0X7

KnFRStJWyJMXKAzFTEixecvUWQKrlOim5akrflPLv5niqAN4veV+KClgSyqTkDThyzMYEKqANVI/GyRuA9UjSD1MxAtTgg7U7UJ1PMAEBUVzU3qN4kGk5BhpTAMaZ6CZH+BpptIuwsUpCDBAZ5DkphQvN2lxKV5a88IBvOSUcAd5Byh5RkqyXnzplLC2Zewt+WuKnlZS2hZUqmW5KPlHCmBQ0sUWIKWlkgFBe0tDGdLuleC50VkH6V3LBlpCt6RQ

qZEjAxlUqyZYwtlWgrNFCy0IEsuXkCK1lGy0RdsokU5BHFTig1UcoUVKL6QZy4VRcpsUwLrlDi25Z6uKX/KNRryp8SCrmXBrvloasVcYpNXPKPF/EoFWgtjWiqOA4K/NFLJlmCL5ZpARWXngQCqzHh6syXDqTnzayO+wXPWVV31ZS82gUAHYEIGVA8Alh1srZl3jJzVCu8rwXWDUPuEcU3K5OSKPvRHhwl8EvsrpF3lZjbAzYBUVsBCE4a/V1uHm

HzNG2eaxsuoqAz4eyDjlycvevzf4cQPwHB8gRofPAY22OT3dyBJlWPvnPj6Fy3ufZMzm5HLktYwQ6wLGH0TxLA8Vutg/xiE3B7mZYQsaf4DDyr5eca+U7UkQ337lN9B5yVZkl3I2rUr0AYsBiKgGVAwAvR+gbQB0HjzaAnUfIm+RaOw0jBcN+GhcIRrnzaBagggDgBRpTCsBqNbkcwGSEEDtTtA7ESUMRqgA0hAg2gfUAgE0Be1FQagLccwFY0Wi

DVgEJgMuDECoAugzK2JcvIVDejuVz81SKEHJB0iMl+o1AKytXlw4eA/GrUdgAAAUJS58ZaA4DUBHlKa7+YECSELgugcAVAByL/QABKVjQUvk1hLZ5TCrOHAuCDqa/EpmrcesrQBqaYlUWzTTFpSUDKmRTXBcKZL4g3LUAZG2QFSCIBDRUAtRFaaxv1VpaeEmWuRaGtU00gKKmIEQCeAsWTK6tygOTbysPlhbMJ7QBLbgGi1MBrNuWuAPlq3E5APF

fIpzV0Fq0KhlADWp6UOM4DTbfNz8nlXcruXFa+R3msbbIFK2rawxzW6bZtr0AtadtYYwLe1pIUnTUAem5gAZqM0mbNNMAczZZvRi2anl9mykI5uc0MRXNmQQjtAi80+bJIS2wpStt23oLmgqAV7Smu0BdBmAHQF8CQ31CqqFwyob0AgGs2PiPtvm3zaZNFikBQxocNrWDq0XSh75XsePJtv22Yh8gPIyLbgGQD4dydUAFmRAGjAnbVtK8yHSUph1

w6EdpAJHZTNR3ch0dYQJndjufnE71A3EASNuNU0cAmuHgHoIgHIBPTGgOABACyO7DWbadPWhnT4UCDM7zx6CtpYR3m0taRAdYbQDyP80cywdnCuOD0GVCqQttq0wUetPC0IBsJUonrftMIDGjKZnYNlRLqcWcLgQ6gEOHRK034AIwaAUXQbqc2BBJQSS5SKZPc0Yg4A1mr0E9IIDA7g9YYprusvnGba5gFAVADOHMDZ7SAMAY1QxCc2jK89wChvX

cpp06h9d8eHkdGE21x7481AJvU4pb2J7OVW81nZtsx3ZAG9lYInWDs53WaAAhNzth3w6lQiO5HVaDR3Wa3Nf2zzeLsKXE75xA+37QuGZEd7Ntm+jzXACn27aqNygEnesqO0LhRtgO2XcnFtGDBSAJHdGIAsmg5Aho1m+cTbt31OLr9t+0yZKE22UBmurI9bbIG0A5CSQz2mzQhL5HIS3daExVV7pJkzjfd/uhcIHtXk8inN9+oaAAeJ2D7tAjQfq

Bbu/HZLXQqoWlDSA9zWaADDegvagFVFPifNEBtQKAbgDaBatD+qAEFL4j8bVQKahA0wfZ13LWDie1MKyJ81MbOA+HFZYItIDaA5wyyqwKsoQB0i6dpm9lUns3n6jrN7BjgMwcANhiDdIgUMTIfwBQBP52gN8TQaYUcifNCshAOzrBVBKQliTdjTfrw0EaiNJGwbaxuAP+G6N2gBjQoZY2UbfDqATjV4h42CH+NcAQTcJs91iaJNzoogM6PCBtaFN

P+0gMpsUXxbDxGm+Jclp02FLrtt2jCfgGM16GntzAKzVDpw1j7PtJSn7Wns83F6XwABs7QapC2oBOti8XQ0lqEVxbRj5R7TaDr3nlaMtgQLLdVsG3DbCt0Bi/UQrmOKKFjVW2SDVoW31aVdTWo7dNsv33KOtHuyYyvJi0Da+RKx0bStIm1TaDjjWp8cccxDA67lMx1bWsc20laG9VOm/T5reOtbn5Z2/VWEsu3VHDNtR+ow9saPNG7NbRuvZGrP3

/aejSoD404q+N3KZ9C+3ncvv52r6hdYgDHQ5ux246rDYw041IdJ3d65DRW4Ey3rp166mdLOtnQ3txNPKedS+/ACvsF3r66TO+4nXcql0nsZdperoPLoEXEAldTAF4xwDV1iBNdnAbXW6N12M6DdEU43QJFN3AmLdxAK3RADMPE77dju53StJQOoT0JXWjAz7oIk4GEAeBsNbttD1qBJAEe+6VHpj1k749PB5PQnsP3p7M9yp92vgFz3mGQDRep/a

XvL3Rr3aVemvSMGRMpqhJu27E2Dpb10mT9Pmuk73ojPN6eRg+5Pdmfe3j6Izk+23btpn3z6uTi+vnQLpR3r7UT2+zE8KZ1EeSD9ae4/SPp83Nn1jloiM8AdYNEHH94p1AC/tAlv6P9VS7/QIb/0eSSDYOoc6TsH3gGKAkBorStNgPprxDSBpCQKKtPoGtp3u0o/hKVEOmnTBBs3QIcXO7ayDFBt8YEGoOCq6DoGBg+juNNg7WDJhtcxubIP8GhoQ

h4gCIaeXiHbzq26Q+EFkObaojShzQyobUPhAHVWhnQz1r0OJLDDxh5jZ+bvPx5KTNhuww4bPk5KXDz44te4dBMBKipkKwtTCruRVSapiKwPH5BRW9SZgbUjqUwC6m4q2LYoQlaqiGkZhSVNbUdBSqmn4BvDoR2jZkECOCHgjMRnDWEZkuRHmNIR2I/Ee41sBeNyR1I36tE3ibJN2RmTXkbCWKbCjwu1TZca02cTKjdyqE3doaMWamjL2xEw5uTPf

bU9W+gHX5oC03SBjjKoYxcbQtjHYtll4K1MZstfG4AmxyrdluWMFbRtax9ndFZikVbtj2WybfsZm2HGnxAJ04wauGMRbwrVx/rfFZG2siHjex83Tle4VZXWzjeiMz8Z81/HGrwJw7VlY8OVmzjF25y6dPsswn7t8Sx7U5YRNvakTX29xX2fRNhnltHJiHS0ZGDcn6zRJ9fW0fJOWH8dVJrqzSfWV0nKdjJnXaefp0an48bJyQ04s5PQ66zBJhs2v

uF22a29UAIU22efGSBpdJeuXQrpICymaripjXU9NVPMmTrhumANqY4C6msr+pw0zhdW2mmndLuy0+7ptPHnMDZ5v3V5MvMRnXT4egqSHC3HR75APpnvX6c3kBmuzGerPd2Bz3bWnFrBqM2OdjOV7q9JS9y6aob3pndtmZx6yWdzN96wxB+gw8kp7OlmBzxOis6Len3zWazV1/E7ycJP8n7rfZ5622f32FnAz3Zzvb2cDOebqTQB2I8OeKmFboz45

1/e/ooMzmALOQec1EHAt3Llz6y1c5wfXPcG1j25+A71dVMWmDzSNzaZKNRt7T7TGNh7VeZHNPXzrFhjleQcoNPniLtB9kg60AUSGab+e0nT+adt/nI7ltwQ+6OEPMBRDDEMC+HZAMEWYLzGuC46qYCIWNDFd1C0dfQscrk9RhkwzDbuUbXrDUF2w/YccOCrvNrh8i51ZzXahcA+a8ILRbIslrNsZatWSCg1lg4tZ/VVkhjxfD6zheEAR0qaj2BtA

3IbQGyF2pWE2ygiEjPdJzWEL/BcYn/UbHsG2BNRwK4FPvljBEKiM/ZxSF4N8HhDnBrwVSdddPcSDbrpckcz3tHIPVfCG6h3KLKesuLJz6y4fQFoQJBYAizcd6qPg+se5257GnZRQTCIeQMDk+HQL9VTVLodY9mkIdetDwbkyFoU32FEDDD9ZZEQqhIzQvD3g36FlBSG1QShrC51rJgmGiWMFoCtsS3pTAOHPoBS3gmHldmiGYqCtV1KfNPInkclY

jUprUAhk6sbWOkeXLZHEAeR11c4XeL9AYsVkUFCPEem7RXpj08IsAWZLNAZEBiMgCTUTXU1ygWov7eccN3N56joNeY6CgpgCAR8mx9RoeuKLwbGWzQEEBPbA7c1OWSCTw/8tRKBHXo0gMI9EfhrxHb2yR5kqzUaLNH2j87cmpw0qPjJHjz5dk4gCnHdHaC/RySA2XGPcbZjkCRY49xWP/HygOx7k4cffynHLjos+48yefLOF9T7x0IF8fWOK8XO2

sDqZCdhOKAET6iyVOhW8AQENonIPCtqlIqWLASPFeio4tYquLOK/AJs4JUDSBLxKoS6NJEtXQxLoZ7w7E7nnxOOJST2yyk7+VKP0nRTqBSU4UepOlHBTtR70/eeoA5HpTnRzAr0cGPqncokx3jaCD5iBnljvxxXladiPnnHlzpz1tceC3/Vai61f0/pAbKfHTT0Z4E4meKLQndIaZ1RclmPiC18ztw6WvLUi4Z7VakYfPf56L2NBK9/fhhQoAwx6

A4NwgHvZbp/RsEMadYa50VjbCG4n/I4PtTigypaekIKpMBqBBiNpG19pqBcC+yBl1OG6y5H/Y95vD916Aw9ft2PV+8IH0NKB2jRgcECr1GckEberu7IPIAFAuxs9yhF18sHruFxsnx6D4PW90JTTLlFYZCVyHwKDEaG9CbQwsoF4botIO3KyCmHCghDaw6zzIbKRKVLhzSJWGYN1LXG/iVpaSMCb48aR7QG5HoDYATLDywY+xGFQbghNxUskEqHG

OoB+Djb4IJFY2OpX5jArDK1ZZi1Fb/byVmK+leq2ZXqr8phkx1a6sGqa3egAUPW5yBtv+tJRxmb1pCumSjrjxyGzVbN2LbZrjV/26fp61F2AT7V47ZRYlv83BtWcePNGHsddAa3T0mWdBbuf9b6rHNkzbTIClBSjrYUrUz5oBNMn1TzM88R3qLtt3P324pO4UrBP97BtcBqAHe8KX5A4c0pnhOxByCEAJzlcKvapAc1IekXPVqzVdv010iH3cZ59

7YeM2vvSA1mmj8I60X6B33LB0nW0c23ujsx4QQQxOf0At7iZPW5yRi470RG2A+dkYNB+J2sHmRm25Y4bYCR8HOAcwOM0FK6NwB2I+tRPcwHsN4exPygaDyx/WUUhfzLt/29oEcviHxrzI22xdalsUh6rnxvm3EcsevnPd6n4gG5EseNAKlqpq82rapDsQ44qkd1OxFSpMoDTyj4IHarIug3ogw06G0XbuV+S6ZgUunX+6N0AeDrapo6wzpA+RT2T

+ZpxRB6S/Wb6ATHou7B5dMwLAg/nwL8F5flViVJzgYzdFffCYJUAYe904EHYk1WG9nC8nRVsQWkAnNTGd01KCMm1inN8ebAFbojMQf3RjgaUVADw+PutdOu9iUwGfPnRrdA9yJ+QWifZusNubhIwW741Fv63ImstxW78t8Ools7ut629pDtvUAaAB70247epau3Wxnt6O77dCLXHR1od599iujunj2Vid3lendhK7v8717+2+s0rvF567/21u/Hd

zbgTzHg9z1qPcA//jbVoE1O5g9dX8g1729/e5W+cBKPrImj0wf3fE6kv371L7l/2tZWgP2XtL3l/A94XNrxX8CxV6jDwf01BH/vah48DofMP2HpgDADw8fahfziw+ZCdI/ken3Hds0dEvW+0f6Pdo0rxj8k+seHN7H6GVx+0A8e+Pzko64J6H3CedPTyiT1+dJ3SefNsnn/fJ9q1KenpKnry2580/afRPNvlu7TdJ1Gf07JnnrWZ7hMjWXtlnuAN

Z7DHVm7P7Nxzx58acue+N+tJP0EC89/yfPNAAFxjWpABegvTqEL8uDC/aAIvIQXhaSBi/KA4v23xz/T/pk9b2fzPlraz9Xc5fTxoH1nQl8K9c/QxxX7X+V+TuaLqvBfur2N7CD5imvL8skGIBUkdfTJ3X+U715gX9eMtg34b6EFG+YzJv04mb6Qb7/RKFvPhJb2wHJ8cBAbr0hJ5t9dB1/Cfg92FVCvKmLOGLCKuqes8alor2LmKuGNxf2e8WN4f

i2BxBLEaTJVRLSaSuceHYAw0t83bSzO8S3S70rdD5at1rcYfBt0e9m3WH2mNO3dLS+9FjXYwR8WVdd3+9V3QH1wDgfAgNB9ZtI4wJ97HaHxyAsA2j0ICyjEqwdsetFH2m1qA14zqtafMHRICQpbH1IDcfLKzPcTjC92flifPkRvdEPMnwo8VfNX0EdaPHXzB0G/FLyb8mfDLxZ9Drdv3Z8wPBvSK9aZW31O0ifAXxJBZfKMBF8SAMX2dEJfXD3w9

7HBXxu0yPc/0p9qPK/w4k6PdwKEctfJj14DdtVgzY8fNDj0VkSQY31tFTff2wt9izVnRE9dPIwIgt7fbyyd8GpBTw4A3fbsA99z9L33OgffOIP98U7Qz3JBjPKA1M9zPD2yj8Y/cHUh1Z9ePwjMP3O5XT8VoHhFT93PTz289AXJzT88x/Iv1C96VMvzjhIvSvyr0NRGvwzB4vevy/dG/X9w0DJ3Vv20CQpDv3Cku/fLxesKTbn0MDB/CfWH9OFUf

1q8egif0a9mvWfza8F/LrzekevLG1X8Fjdf2WVN/ZgG39xvVsV39pvfQMP95vZSSYllvOM0v91fG/yOlefClzzUqXUexpdyLOl2ntLhddVGFM3JeyVAOXKOEqAegFYDYBGiKoCjFGgIv0wBFqSEB2ASIBoBv4+hG2QigX7FsHeBDgZwVZhImf1hlQoQGhxOAX+CQUJYgBHZH2BNMPuHeBwCNuQvR7hHV3dB+GN4F1gaEZdUagsYcTh3VJOUtBjlj

XI4i0YwHM4gU4z1TOWtdL1PNjtcb1RB0dcyBZ10fU0HN1wwdCaWEW9cS5f6EWFmBddF9xAhTak4EJgI0gIdewSYjNh4oTtgCYQUIulz5G5csCRBRUD/gr4ZBGDSJEz6BJkvZU3dhzPINBHbGGEdBXITJIDBKCCMEcIcCDphQIbCHsFjgJ4CjZOQuEG5D92ewX5Ca5IUJbARQ7GCaFOeGlE8FmnToUFA/BCiD6ZWIVoTEgOhHwUFBRIE9h6EkEQkO

oh8AQYUjD+mFl0GYQkRtQNkY4KoFUgmNVSA4AEgfAD2AnUJUFuB9AUgCjFWxBtlo5D2W/Hv5hiN4ChAkICEB1hHgaRmxg3ZIAivsDgXelhILwVmBHZluXGB5Dp7d+wjkXmKOV+FzXeullCE5dNn0ZM2FOWVC05Mxngdz1B1zBEUHGPl1C4+F7gT5sHOEWNDOCPfD9drOJCDOBtYC2nXpj0CNwxILgFNEdCR2DuT9D0NAMPiZoRYMLFoaSMMPSY2+

DN20E2SXJnx5u+HlgkBbgTQACJpyLvF3x9hQViww4MFWCagQKR4H8JngVwnyoRSbAEBhlWf7BX41WNfg1YN+ZDj7DUOF2n1Z2IGACEBzSKAD3xVqNYDaAnUNoH0BTUGABshiIPfFyIGsS2S15+uGuAVcr7NnEeBqhSnAm4zecKATQoQP4EZwqkLMPuErw7BAeZkQe8N3VpKJ8IVCZQ+ORPV/Ii1wQcTGOBxzZQootiQctQiABdc85agQLkPXIuRw

coI3AA9IzQprCs5+CSpkSBOGMNlDcj0ADTB4xBNrAwimXFQgJEE3SdiTcWHTPCIjmWW9lZZh5JWVx4ouAnmhpq8VsBIxdgDCHlYYMYgCthm4d4FrBqEG+1sQzgHvH+Q3gb3BEiOmajA544KKSK1ZoQ52jQpV7FYGVB9QTSANgqgQgFyJGoPOGxh6AZwAoAfgTACfBjItcKJDCoD2TY4LaahEHh1OXhkzoWwNRE2AzgXtVuZNgJkIeEGXcpCQFxQx

8KO5pOTAXBo/IvbkgdIonNku5gRdUIMpoonOT05KBSEX1CKsCCKNC62ZUFgjsolNEOB1gYfnXoCoTESKQFCFOiwj6HKqO84SRWqKpI03XWT6ZOHCiNaiu+CDBi5KgOsGygZUWpi2ENaPkmPBDgC8FUR8qC7AMQTEIBgbxsEXADZ55o1flLD1+bnk34a1Be3GE5IocLhwEgSQCdQ1gegD00F2QYB6AHdbAGVA2AZwE0AxeTXiuitmDcJoQZuGkOqE

MwkdT2FDEEpCAJfkfvlYoCUB3gXVm4IAi+BtYERhnxp7MXG8xyov6n/sHwwB3BjE5GvFAc3wk7gMZ7XWXBhjr1L8NBES2cEWRj0HAmjRivXUzmT4NeDKObZ0WfghewbhNsBZoXQzTE3pQNMQRvBHgDekldfQ+N39DGHaqOpj08RDRDCKRemIvJGY6kWZjy8GiLZiJARDBFJY0LWEqojYQBnlY+ILkDOAVYSVF+RNEQfDEAh2DlGljoKRDk1Y+ybV

mVj4Q7Ih6AqQHgEGBBgFtXYg2gZOGwAKAdiC6A3INYGTh6AWoidRjQS6O2pXWdKEnIkgBuBlRWYShGMQfo7jiVhjw8NA5gh4AOOZDEaWghAReQ3gFDwXhbbg045cM12CiXwwKOQSIYkKP/Ck48KMQSoYiPmLYbGJGNddQI910wdkoyCLrZBgbGNbZs+UNA8iCovkPuFRBaFBOBYQC2kHh9MaDVwjW4qmN7lO4+qLR5lZELgjCGHSiLx5n6WiPQBt

EPiDbxWYQ2Cahuo8IjH5x4lWASAmmCVCth9ERDHlYZoxfhVZ4OZVHcEEGJaJ3iVogXlVjV7KkGeAegEQFyIFTbAA4A98JZh2AqQPOA6AqgIBmyRX4hjnvxv8NpBSB24GGCOZKcL4E/5rwj1ngELaRqFW4lXZbhhAw5d4G8iJQ8BxQSY418KCiMEpOTwTYHW1z/ClQtOMISM44hOfUwI19UNC841KLhxqErBBkZ7gTKHoT3QoQQpZUI2uLJCY0dYD

xEKYluLh424vhJTcBEtQVhDNBciP7j47QeNZjCeaOAbhv+dDHE1QnECh1gHsXGAS5QnE8PlJrYFWhFIYYOsHqoN4rpjljJIhWOkilY1lxVi1ozlwkB/PKAC6AZeDHCgBD8OHFNRJlJyEaA4ATAGg4NqOjktj34jcLZCnQ3+g5DcoABPoo46SpGKRP2OpPATlXRGgQEuiAMHhSEUs4EjYoBeBIAcDXdBOjjvhLAWBicBRUMTiwo3JIiisE+GM1DEY

opPijQEF9SSi31Wtjsp9QapLuhvgINEyhKcdelN5BBdElri3sFnAPCm46JiVk5BQMIIi+5LuOIie4zHhGSceMZMyoh4yZMqB7gPAD+B8uDRA5iYQeoQQB6IlsBAoxuP9iaguQDZOKg9khaK54UiGSJ34LEi5P+hCADYHoAbIZ4FNREMWoGeAZwDgH1BHAcjkaB+JC2LfideDcMDZ9MCNCVhcYFuFDIGcTKDiA4UWNHWA++RWC+iUQMORIdUUiOPR

So498KxSwYnFL+FIY4lJBZk4tUNTiAI9OKAiIRLONe5yk97lSi1mQuNHJi48GHqYG4N/mri8+EFB1hiYwJgSggCKuXbkuk7hJ6TeEoMJFSBkjh3DDeYSVJajpUrlllSOoqDB1glUjWAiI9w7wi0xlwDvCRBoiFWjVoqedDHrxKcDVKNTZYxaKOTlos1LGF94s7A2A4cZODaAwhZQGIBlQIwCqAHU5ODgA3IHoGTg4cJgRXCvSHxIG5v8W8ChAsYC

Hj75QUCXAvszaeIA7SAwVdT/J86BMjjpneBDIeYiYpNJ8ikE1NL0Z00r5kzTnwj8MtcjGC9R/DgWIlPyTC0wpOLTM4vUOzjuydGIqS62U1AZS+Q3YD+AdYVlIYSQUZpMaTOUlhKOEg0W3nJjKo7pMFT8Ij10Ijr2YdNIjhktDUzcB4mVImTp0qZN3wzgAYFygbqLWBS522E4D6JOUUqgQweUi7E7SPkjqFg4oKfZMPTTUk5P7Czk9DktSIAZOE0g

uUE+KqBmAU1D5QXCGyAoBNIHgCMAbIWoEMyD2b9O15fEphl4znqGNMW5eBX6jDJTgOIGjTHga8CCpdgL2JvCK1Gzh+jkBSOOwzUkzDLlCfmVJNO4SM7BMJTcEnNMHoCE+9W1DUHMehITUY6jNziK0uticgGM3gH4F4oKDPREQEZhPLAEoYIkZx+MzuUzchM2vkwdRMgeRIjhE0dKkymYidOoi5MjNmrwgGGRMg1QUUCjWAMMPklUQ4MOKAS5m4bA

CRANXPYHgwjYfdPEiDkrqm3jNZCzNkjzkhEI1BVIZoDgB6AHexcB52W4DzhGgNYAoAugWoAihyMbxMCzf04LKbBIycEGpwZUbGBQ0wyBKAkYekUnmxIsYWJJVcoQYDOShcoH+K0zI2AqGvsR4f/kQxM+e4XSyU0zLMyS0ktBPQyW6fLPxTc0nBOu4Ss/BIRiWyYCKqySk0hINCaM+rLsopY6tIhJa0rBGvANhPKCKj8Wf0BEFio6FE5iXZTTD6yc

IgbMTd24+ln6SxMsbKaix0p9nGSHCeTIwpcMVbJgweADVLVhP7NvHy4Z+B7FrA8oX8g5RhWa7HlJjshDiMSkOY9MuzzU67OyI4AGADgwhAU1H1pGgHoDaBMAYgEkBb0/UGYAs4G1m9Sf0syNvAkgOzHDQZGGoV2EmOOOghALqKpE4ZaaW5hRB9qb4Aswl1CpAOAMcuIG9Z+cKbmbAHgJJKBiUk4nOyy448nITi4YqnKKyacgrJJTAIirMZyqBSlN

KTqU8tPfVk+X7OHJzQmtKyjeEDmjNh6kptMIRAmJV06yTQZuCjIZyKXObje0wbOYcO4hXNGzxUjJhVzH6FmPVy5sqDCaZ/CUfJ2Bd8O7DNgqeExC8hvCPiF1Fh+JWHww4QfWnKQbcwxIkizskxIuykKSzLPTKgWokIA1gLOH2i3IDzOThCAYiE0BlAQYAoAhNU1D/yw8/7IjyhuX+JoRc6FNF1hP+VsHuAGkPWFYpm4CVnt5Z1VLH44ZuL7G5xvG

QxAeZEMBpF1gfgXKHQjsoJ5nDjUM6vNBisMivOjiKcuvOhjqc43Fpzs5BnJLTKMstLZye81KJo4DKFgScoS4/TDs4H7demhg20sJi7wSqB4AXz+U3cjg0ao1fLqjFcjfLIjJs0ZKoiJE4ePQA4QKIgCIhSUSlMLjEfKilY3Yvkny5GoJsF/Z6qRzGfyYKMzL6Zd405O/ykELOEaBMkCgC1EBXdcJTRDEPuEz59MdYCTRgU8KFZhGobYBxEioemnu

oCCxlIkYz7RsARA7hUTl/sy8jLKZBgHFgpyyE2YnI4KC0wrNVC8kynNKz6c3OSfUEoqlLISaUpdFSiSBd5CLih8/iAtpioHqJvBSHJhNFy5CDAubgcRLhJlzekgdP4SdCibJ7DR5FTH/A2IaJSdEnNS+UQV3RZoCc1EFFz0+V4wAwFz8FjJiRydy4BYqp98/PYOL8yQO0TVsnRZwEVUzfVdxycLRI7SqdlQcZkaBaiXIkaBTUTbWOL6QQQ19FcAb

QGyB6AMzzeLaiNoAshug9iFqJXi1SHeLPi01DvlOFXFwhL2IKkFUhaiALzjhaibQFxKbpLABOKzpZcGgtmgAUDjMFAhJ3M0mDBqzDFni1kX9t1izbTWK2pazSB0dtOkqjBJJV8DYV0nTWyaUDoHhGz9FzDkvyAJ/YyTr148H51bE+SrYpFh0dQF2FKklVkXyBmYiUqI547GUrCAXPIUqn0OSxQ0ylwDXq0h0EAHHQ5FjNL4091orR0yGg5wYktsN

4g8BVfMxYHUq6sOSwII3dV3dYt0ARABaHsNr5EX0Vl4g6szWsaS1bUdL47VUwGCK/RRS2kfANQlMkavQv3YhxgwAzbsB7Z+Q5LHbDUWdtWRVoCPFVTbA2Ht1Ab3XV8rzdM19EeJNAAMkzTAg2D1xIAcACFc/LO2cBVIMsB5EqyzgjgAfAHFSekFAEw3VFqwYPXXBiAGADQBNVBwyeU2VazUvkuSpzTFKJvD0pClpfbIDQA2PSsHqt1y042rMyDOz

1DK7lcMtpRrNLg3pLI7BqSYNrPBkralvSriCGh7DRPXjwJDTRTY8UFXw2CBnARBWcBJsSQDvl7y1kR7wOJXoIt1g9NMvEDClA8tAwfgxQLrBZ9O/1O0p9CD211ClO6TtF9SgWSgAORYAFQq0pSsFTMnFBGU0keZLkvVEFdRWQwquSqBU4AqQPxBGBZJYAEUUzSnkvklrNT3SiBSAa+W0ASKk0qgVsZWGVwrixAGSRkwZbSUeCTJTiowr5y1sQoqO

AKivxBaK+iuM1wFKUuIBmK7QFYr2Kzit81uK6GQslVJS9zwr3RRMrq8vJHyWABYS+Eq+KtK5oAwrLy5oA4U4pVbUM0uZQStdEUpNKWDEaPbKQAkOAPivDFrxYAGZjKwaKViln5YCXFk1JPoy8MeHX4sWKc7JiRWL+S9Ys2KtSuUp2LLi/YpCBDioFw4Boq04sMqeg3YquK8/G4ruL/bR4s/1+oVkTMqPir4p+L9AE4u0AASoEvl1QSuEvBLIS84p

hKwShEqRKYFFEsaA0SjEqxKcSvEoHMCSv4qJLh7WwxDgySubXo8eAaktB1MynrUZKfNZkuaBWS3o3ZKlSzkvkk1S3kqZLkqwUoVKtqiqqjAJK4gDVKlKzUoFKFwF0tvERS1UrYUnS5gGurtS46tt09SjgG/E0Kw0uI9mK00vNLn5S0sCBGAHIFtLJqqAAdL48Z6ruqMy7avdKbK68t9KRRePADKPzdnWDKyTPcqcVwK50oMlBgmMoMA4y7tzyrky

2CtW0QK+/zhrTqrMuPKQ4Kb0kACy+0yLLJAEssUCyy4PQrLkhDsod0ndWssAN6ylgEbKeRZstbLEAdstz9FRbsrwBey/svbFBywA2HLRyzBWwUJylNSnKZy3avq8RKgMyOtlyjgFXL9fdctBMYbbcsjtdy9M1xrmAI8pzKeDVSo0hzy860RrPUG8pyA7ypC0hr/NJ8v18XyhiDfKPyr8p/KPajUXakhFEv18BAgYCr790ysCuhqIytbygriAGCqN

MdtcWzUkEKkKtxssKtQAwrs6qABwrg9fCsBkhKoivbExKuivkkpKmSpoqyK7zQUr48dJxUq1KkjQ0qtK8yRxkfKouucqUZESuIqCAUiuABzqquuorK4WuoYrFKzGSbrpQdSv7quK0yXbreKmm1QtSatkUpkTKqqoRLLK6yuWq2pOyqXrhZbmWRleZNCvcqvA0gE8rEpTur8qAqoKtwrQq0CSEkIqx/zHsKpei2WdGLd/2aJWLL/wkAMVTizYg9nA

5z4sjnYAJOdQA853IFLnKlQO9AoQktiqoAeKrWqkqm6sUUoFAqvSqnRI4rqrxqgyqhKQ4NKuuKmJW4o917ikKTKqOSjepqqfNHKoar48QEuBKWq94ohLSazqtaruqzRT6qBqzErjhsS3Epm8LRMasWLdRCGumr0YWarPqqSnHUWrtqmyoOrutdarZK1JEUtnLGKhMVeq5Su6tpLtq0Up382FK6rka3qrRxTqlG7Rseqra9RqOqjGz80+rvqtKV+r

tRf6rrrsa4GutKwatqQhqoa9UsPL3qvSrdL9fLWyOsvSl2uRr/S2eqDKpbEMstq467xogAoyqL1jKb0BMqhKUy3Czx1ojKmsKUlqsA2D9cyhmqZrzzFmrZqEnDmsAMua4gB5qaymgDrKBWBsuYURaw2xyAWytsu4AeRKWonl5TPsuY0ByvM120lasctVqSlDWp/kta86t1rV3fWsNqPtSBQ3LTaqWx3LyQKRuD0ram2oztJQe2oCRHaqOsCary4J

tvLtAX8sfLOFZ8qYVXyhAHfKwgT8vuCg68BRDqAK8OqArUy6OtAr9y6JogqE6hJ2gryatOtvEM6pCqzqvqzKVzqAWtCoLrADLuq0lS6knV8A5KyuvsVq60eroqnG8BUbqWK6epbrZ6zSvnqYZSyU7qBKrSXOq+66FvErMZYetkqx6+uqgAlKqerYr0W6FsxaeKnFqXrcG84tXrlxamVMquqiytMkrK4ABsq96vSs5kvK7uuPq3KwSQ8qhZLmSvqY

pfUX8r47QKrZlpWkKrFkH68KoC0h7Ee1llywWl0nt6XAZEhCP8vnkszdC/AB8L0AWoFgBdc7AFUh0or9N6hu1H5KjZ7MCzGKRmmLEnQLh+aEBjxR8weHcofo5bi7xWwPuDftWkFsATRv7FLMLDfqAnJ25DXT4SKLmC3AXKKCUyouIzqiunNJT+CijOqyqM/4mELaU7MH6594TKJ+4cY2oTpDx8oQVfrOMyN25C1yONzULu5IVJEzB06YsLx9CkeS

irsGmKoyqEG5hUQUWge7F7akG/ku2K0GghqKrMqtrQobOW74uoau2/4roamqkErhwwS5hqhLWG8ysRKbpUkrEaLFOkD4hlQeaUhrFpRZp+bD/D6zjhLiybHR0N9cIFpBGAAMxsgT/AGuxqOSrADekcNHzTkVPUNhG0BOPKvXw5ggJiXpBrNAAAMrpFUvgkIAAABJ/K0QCflWdUDvAsZ9d9pJAGIHHQg9E9e9vRrXS7aucMdRd8CEBf2tfwQBiRVU

yulyasMWYAHDUQC71RAdnWo7LtPu0VkGO7QDIl1lZjooswK7QD0U2APiCPdNQRgFY7OAKVSPcn2piXZ1v2ojsAtxIbQClqaIKisVBlK5gEXNNygJXxLMAQkuEaSSmaosU5q4cG0hNABapMbTqo63L1HstqTkb1ijaoxMTqqpzKhr5cMBWqEqlksUaJbZRq1rkW+SQsbbqnxq0bTqnRp1q9GzGR875Sqxrs7lSsxteaxYULthrbxftp2UmJazWpKG

Kr4w5LFpTbT3NXdQ8w91bTI6191DpT+RlAPcUgA5ECSieU/Esq5+X3a70o9ts1RAXzVUr0QC/xS7AawA04V9QDc3ncpHPkCx8UFbY2dMnFYEEFAT2EUVM8Bu5LpfaP3GfQc748Jzp2afSwrVn1SLIHTWCWNTRQIABu0yUzA8xYf1m7rk4gCCbFu0c2G65FNA3G6aIfrTM6YpI7tdre2+oNZaqZZWsobTUHpuFN1AamA7KmpaQH5q2zPrwIAuw3eD

QBWu4BWrAOGkMwIA0AdwHpV7FAVS28CvThQklNOiyV3YAe1AglqQe4ADB7kSiHvwAoegHpUknxAktzFl/cs2s81OmD1U6nNGMGsbtqvOvsbTpRxtS6ga7QCtLQaqAHBrZDTxphqfG6mvs6SARzvzEfNfbvm7mgJGqGgynGBS6AIdGAGEBtukrpUlyu8wDUBZIOcsCA9RYVQwswgazRF7iAeqz8apm7kUANde1AGW7AdF8Ab1v5U7tG7euo6xRrva

Nx217de+zycU0Aa3vO7Q/a+S170azRW/BAenkC6tMarHWxqqO6Lutr8a6Mvm06qxJt2CkylJopqnmjJruUsm7yzpq8yuUXya/dQprODimnP3LLuJbmtz9ea1SF+7VtQWsJtL5epp/1GmsWuH0Oytpp7LuwTps4BumocuSFla8csGbV5acuGaExOct0b/bCZpFtpmt7tO1Zm6oPmbT23bWWa6asgzPLsdXW04VNICnUG9cdYYNJMpmoKFBtQnM3Tf

EsgYgAUBievMRd6ZugXrm78xM3r812vMiBt6Lu8BR16z+g7us8ggXhXd6xu0PwOb/fSmruU+fZZveaOJT5uMbbxb5ojs0myHUzq6JPOqBbbGtQFBbdtcFsIqQZMutnqyK2FsoqR62iqZ6KWlFtUq0WwQ1bqsWnSrhl4BvFp5kCW5AaJbB6klrhaMBjCqwHgukSupaZ6ulrbrsW3SsLq7JdXowrruiztsr2BsFoPrhW1ysq79RcVoPqpW2KVlbaUe

VvZkkK5VrAlVWwEKidglTtrgae2xBrCAB2k/2QbEqkdpSqx2vYsIbfpKdu2qXu2qvqrGqhhpXbWqtdo6qXutrR3bySmrsPamRFkXq7sAKfrW6xzS9oMBr25Lqw78AB9tMlxOp6yca0u7atQ7nRajS/bCO39v/aYAQDpP8QO8DqPbIOpaR5FYOxaQQ7owJDoxr5rSIfQ6vBgIcYB9PTJrw7NtKTuI7rg0jp0JyOo9so62RGjtOkczejuflGOo0s47

WO9jtH1+7NoZ46HFPjqF7QDbDuE6RpP+TE6T/STtiGZOgVjk6uyhTtVVo9WzVU6+jDTq073GnTt3anxfTrYBDO4zvurtqngec61qmzrDMIu6/uIBBe44bCBrOtzpM6qnfIBUavOtRoMaNGvzt37lS0ZoYHVHaUteHLG8moer47NUuerYu3nvi7NBxLshrMevntZEMuzRy9s1pNA1y6UbO0wOlVRIrsu7SupXvHQyqu5WcG6uk9qa7sgSbrCHg9Dr

q67MPTJVt7V3bUwG7g9N/upGQpfZoFYYAEkeZ6IzU/suHz+27oWhTelbt6M1unqo1F8ALbuK7dlOsQFahux/tF7xek7pv6Peu3rFHaPI4YW67ulYr71jK88TQAXu0frB0PurIC+73MUvpNNV/NHqB7IdKbux7eq3Hvx6m3fMSfFu7eHr+6YFJHqVE8xVHqVB0e7gEx6rR3RRtGhxAnvtHQxI/tJ6xbcnt58qep3Fp7Tq+ns4MjS+gYtLWekGptKN

h+0vAs/+8Ltw7Tqk3uF7pRw7tVGFoSXtU0ZeuXqVHFezToq77kmADV7zpdZS97He9HWd6YR4fqN7dtE3sv7JIS3uv6RuhUdXd7e73of6uRp/ob03e+Uff67e+sYxdDmmBT970evSqD7sgTwZeavGt5tiaCaqPuJqvvUmvj7W7RPp/6sxqp1prba9PsZqeRQsujFWanPvek8+zmoL7ymovsqbdRsMXL7haiAFFrmm+vq7L2m2Wq6b5ap8aPl2+/pq

6U1ahiCGaVGr4cH6HNSZuyAR+k2q3K5m82oWaQ+p6ojLZ+08odqF+mmyX6V+5ZTX7QbDfpgmt+o+UJrKDffsP7ke4/uD1ORwXr5HzejE27Gzu8cb7GDm53vOsX+xRQZG7+h8q/69xpxV/6w+yCo+ak6r5vgrD/RCruVkK+xRgH0KzCuBbsK3Fo0li64GUhkKBgevIqaBsluAB6B54cVAmB2lsVl6W7So7rC60gaPryBqFoHqh6jSZrqtJk0qRbJS

yetRaaW/AYxbWBogfsqJJzgbaluB1d3M71i/lsLrBB5KT5kxWs+ovqRZeAevq5W2+qVaCpR+rVbn6+Zyra3oV/1WdmLL+o2cAA1qR/88WP/yAbAAkBsnwQA4S0eQJpSlQktVBnBvUG+2iEcHadBtqWQbR2/BsMGJ24wZulp2thqob0FedtoaogJdsYa2qlhvsHt23TqfF8R1wePaGu0Mog8L2q9u17b2wTpT1AgEIam7mxgoeiGCOn9sAt4hxIeA

7aPFIYmm0h10UyH4OjvVyHn5FDswAP2kYAw7D/YoZw7fG8oZiGtpnIF0BqhsjtfF6hoAf3Kmhujqu9uOpjvHsuOn6e6HOhvod47+OrW0WnRh0Tq1sQhqYZenBDWTvk75kRYeU6Vh3y1GrNO8au06pqxwfEb1fczQM6iifYf86qnFUYh1Vqm4dc7Nq+4dZFde64fkbTh6MYeGnhhuu86/h3zszGDhgLq+GJ6kStBHuZsmci6gRlCdpRBZu/zUkEuw

drZG2u5Prw7aO+EeQNvbJEeRs/bVEcIktPJUbK6Kx5Xram9K8adNF3Bxro+6Wu1afa6YFTru4NuuqkcPd+ulkfpGxxxkd2lmRviFZHoRjkfmsGZgsaW7+R+ibTKNukUZZH5e8Ub268xnkaNsGJ2/o/7MR6zQpnZR+7o1G16rUdw0Z2/8ZFN0QA0dz9vu36XTmQ9U0c9HzRn0ac0ce7PTx6Axu0dh7HR2/wR6XRjAAom6wD0f97yQDHstGS560bLn

bRmHqJ6KJ0MbB0Ke3bQHm+JyMZp7dSunrknuDOMb+q7J9kbuUXG9ns560xhjoEmwR+WezG8xzbW9mxe3ZpyAix6XtQBZeoQBDnuxbEZV7qxmf1rHNehscHHBe/Xvhr/Gx2aHHwwWib/Quxzic9748AcabGIzUcZ7GmJpkcnGh9acfC5m5wPoiasaqJpXG8atccj6Em+Mtj7gvHcd780mmOrXnDxjlWKD6a/MrPHmai8aKbrx9UdKa7xipr5qqmgW

pqahauprfGGmqACabxalps7LpajprlrIFf8b6aVa4Ca77WRzWr77tan4YurFy3aSH61y3zV1GKei6YQm1mi2qWaBJtCbWb5+/32wnWRVfoN11+tjyImd+54uk6D+o/rrAT+r2Y3mOxgUffnFRj2pvnz+5/tJgo53saZHP+3W2/6+JrqwzGaPQAdU7RJsAfEm8K/5uknoBzKTgGHK0yZLqkBiyZhaExUlpsntJ9mYTE9JlyZYHCB4ybBbAlysV7rV

J2iqsn0BzSciXKWxydwHnJjitcn4lxeslHbJGKW5afJkKT8nd6/gfgGgpnmWEHfpUQbCmJWryokGZWm+oVbgquQbinFBh/yBDpZEEK1awQnVohDZ7atU/zYeIZNNaGAVSCchagXIicghAFoCcgqgPYDch8NU1GUAOgUiCMA4C0yLuhVXNnHhS/yVhhiLUAR/nHVIoanGkZ4oJbh2RUMLoiLysoNsFEowUGBODifqPIsJy2CtNNjiMk9gtryk2+vJ

TbispvKiiM2uopAjmcmrNza6skQrrZmgJrKnUgkxnE8psoAYprixc2Rm+A4UCAmwjF88Yv7ThUqYvXyWWBmOajVc2TN3yPw6vF3wHsY/J+BBogGBCTnsWsG8ZPgVbOsRsMFkFbAtM15D0TRI9ngPSTUzwrMSBwiYX1ZSAPfA6BmAOOHJBpMB+GSAGJIQBshNISltqBkgT9T+y9l8KDYTyceKEvAzYQJNdlDMf4CSBioQxD+551a8D9adkIeBQh8Y

81bBTkshl3eXlGFDOST5QyvN+WMU98LKLoHAjIRpgVxvLTa+CiFaZyGizvKaLu8/NqQRw6fBIkLaw7KMeZKcebkFzm084AUKgiMlixgR4MYoojl8zQvlztCklcaiyVrfM741cuNfPh5s4pDUS/2a8GFZ8UeEEyh/CK7FWyVYSnDIw2pcCnwxNEe4DcKt49/LntHc09MHDV7YiBgAOgHoCzhCAU1CRC98NyDhxJAd4sGAVgY2WTg8HLVfXC++KEGC

IsoeLP/V2KO6HihvMfZjbA90BOi+iWwaKH3RW4d4Eygfot5e+o3VtMkBj8iz1cxTvVsnNiw8Mwti4KG8ngtBWai8FaISKUmgS7y82lorrYX4/vOLbuBd0B0wLhQdnXp8C6tvB5k0GgvhQ816kQLW5cpHmLW6Y0ld7jyV7fMrWe+CQAOBhSa/JKp9YNRJsiVaV6OSAe8JjYnVcYA5iY2AYAdbtzzs4dfGWnc6zJuz0AINB+ByQQgBRwXCZoCdRn0p

qH1AV2mcGcBdl7daVgUgfVfaTikPWETS7IkFAqRDhSpmkYkQemnDZS84uhSz8oT5ZjafVjDK/Wic/5c/D/VwESDXANkNcj4YouKPqKO8lnJziwArImT5+XLnMkKJyOmkagaCtlIrauM8hE0xcYcpDOBcVntIJWNCvDaUECN0MONaRE2HhkzJ02bOpWoMF8j5IWwVkFCc+UMUkNolSG8HE1AOaUj/UDsr4EAZoGWaPyEZYk7I8KeeEdZQoLUwTYgB

l+0gGqI8PTVdtaxQe1t9SykJ/FuE0w8qibATmUbDiB77JTK9CUUp+y6QX7bGF+ALqGNCKhQ4mBNDjo2xBPeFCio9R+EbN31YBX7NiorU5YYwFeA2W82KJ1Dw1jzehWrKaNag27KXe383E11tibgmwPGEJiwt0JkB5O00FGw2YmWXL6Tkt7uJmLREuYsNl0At70iqYG+/SXcGQRKef9YVFZyYtUAZFUymf69AD/qdnABu6ksp/qW1B79ElTOdSpqB

oqm4d6Hfbd1W4EM1ai1Cexvop7FLP1beNw1omX2XMdZsznANoBnA8NTAC0tzZRwHYgs4YgA6Bl18kBnA+tz5NXCfUoLPSglidkKWIWwcqjBQ0of6KeBkodwnKQoYdYAd4fgOFMRSEU15ent8o19cYKPV3LK9X0kyzZry7Nq1wDXc2M7ZTiTt5vKLTW8gQuzahC2FZjX/oC6Ng2OiktrrSKETrHc42M/YHRW+2MQXfxpk9bdUKew3DZB3aYlLaI2J

U9tvHTDC6LjlT5YMqhQxXCRIDIx2UcEBaQvIJdS+BIGH8mtgUuVwiY2GIvzINYl+ODjEjbc1/OMSj00xJPS2t53Ojg9gMTYAgdgV0GIARxHgBnA1gYiDYBVIYiHIpmqfrY2ZtVozA+ANdufmvAmKduEizS6I8JeAAOGNE447OIzeN3TNzKHM2dtv5Z+Xrd79cTaXdoFad380y/cu23d67cqz288DajXINnzdSivE/3cHzA9jPkSBMofdArihc7Ta

nzBiglidCocwHYFTgdyYrXzCN0teI3y19KnETM9jXIkBpCi2HoiDshDD74HsFuDKpMoYgDXUlYDWH+ArYXlFUSYHYzNVZm907Nb3zMvjdHXxVocKpB84TgB1jL0mcEwAPUDVcqJN8CkEU2iQgdSeBwKXWDqoV1DkMm2Y0EpD0xaCpEHaSQCMRlbSTNhlyDkj9zugTaTXA7e+X44u3fwyHN6/aqLOC9Nqu23NyFYjXPN2rO82SaZPn0Ams9rBaYA0

gA/TXGoTNdwLLmFsE6SBMpfKgOiVmA+T24D1PZ7CMtmbKpXq1qDC5Q9EMjE1hdgBDB/J7gfLmniAiPKjdjWYfKijS/gP9jEKjMhvZMzjU0rjb2DW7fgYP2t7Ih2AegNYGYAPoQYCMBk4TQD3xkgJyASBSAJyFUhCAV4Eayt1gQ+Mx4gZEAvRDgP/dcxDMQxAuA9V+4DkYlCEqi+imoMORQizd/Vws3z9jQ+xStD23d/XlOHJMc2e0Xgpc2yU8jOK

SzD+7boFX9qw9SiuAV7cXpsogqBgJl1Rw4nzXQn7bQimwa1aUKID9Qp7loD0HbFSU9zfLT2KVzLZCOnySoE0B9MY8AGjs88EHyp+BOxD4ROUDvFaA+YynAOyOIztXq3G9wVaa3hVlrfoPO9gTeyIqQJ3RgAeAKkBnAvUYyNHlOj3uDbhKce+0hAYodAthAJGIoRjRjEWHLzQFtwgsHgXgeFJGJNMJpHDaXV9MPBz2OFpBYy0st9a+WJAKUJAcz9w

7e0PVjgFhtcNjt+C2Oysp1wf228lGJzaHto4+BI62NgCayfgdwmocwtlcmdCMV8sCqR1gG8BdaXjxtuEzhsltpLWLCBA+4cYGuxUqdWROUR8Iig8xSfFrAfMQdg/VWHY8wGAHRXdOhxdEB5Ao1ObT9PfVQIFmcn/UuhyhYQS8EwhXqd6hR2P6tZwynP/fFV/rtnX/0AaCdoAKKmwGkqb6Yyp8S28M3TsF09PIzn09DEYzgM7jPKXfpbp3VyoZcZ3

dWzdVGXmXVrYojJlznY63NAUgASBx9noEIBGgGyAcg1gecKEAcKUXiqBlw6XYCy59+wTZhycduFpwIQSUlV3lgSKGm4UQWdOW2g0LyNSKJ4OIEN3Dd/fYZcVC1Q+roT9qzelPljn9eySFT/Q9TbDD0NdA33N5/dZzvdp7ezBCp0rITXzj8GDcpltr4FNP019vOnzzwfnEHUioDw/6z817w+bbiV2A/rUy1n49I3KVqtYBOJAPvkbA28NWFCc++EC

nrwE6W8Hbg8EBuD6JfkHjhCATgLjZb37c9vb7PzErvcqBiIJ1BshGgPfEPjUWUk8G25d3MIOXBODmGvA2OdAtyh9qU4AzojwgeBhhbmU4CvslYDCH6JhDn+IUYDhYqEOZjMX+JnVZj14XmPJQvbcWOM0584v37dvQ/TkDDi7aMP79kw9u3fzrzYgadTuyjzhbD6JOAyN6QmOAOzT0WhWz3CG09g03jnw4+OGop0+wuMNSnf0ARnFSXoAeADUUFAt

FPleUHvDLaXiv8xRK+SvsrtK5SmaLeZwXVBcRDHZW9YW7AzO3/LM5iuczrZxyngmPKaLOgLzxGKnSd8s/J2MrgwCyutFJK5jPtFGndbOx7bVs7ORljbdFWlZAc8YPV7PfFTh6AbRC8hgigQ4bxycHGG33TVoAiei9z5KFkv/1WnHujHQ25luxpt77FDav7bS+eEjLhBLUPY22OXMvWCj9aO2dDv9cQS80uy9v2HLsjPd2s2qFc1PDj/87f262RHc

/3uczou4Ak0BzBRWw9jcjQ2o9+6PW362+PdQv7T9C78Oor2YqgDYjJS3o0NIRjWY1tAcu1WV5TJANcU6VFSUGMrLfQ0t9HnfmyiMfB5XVgAOgSrHI7Y7f4PMCDVflT+C3nIn1pvvYLi0nWmbnkRnEm3GitqJcga3TZuwlGcB4QWjrIB6BamcBW/kZK4W8rhVIIVSxd8lbm+Y06bvm8ZusgT23TUZJcW/scOjHLQNvM1ANTlVgXVK6hcCbCQJ5uvQ

HW4FuDWP1SNu2nb1WCBv5Q9r9UubvSvyB7b+m/5u9b1prjNXbwjzyd3Fc/x9u7brW95u2IQO7C6pVABUYVQ7p53FUU1MpUz96Qd8zVvalbNX6NaVCJWlE1HXQ2SBKfazQ5uWbpzXdvFFL28CBWbVNXP9677+SdQzbrIHruM7ipWzuADA1SnkYeou9bFolOux4Ay7iu6cMm70268VKsdu+jBv5TO9IAu7m+SDPKgKSwCMVLTgHxvkLUqSJvrvcR1J

uGVOJ2KsElBseScabmO4du473W7C7q51m/sdR7nuz+dNbzgG1uL7p26FvggEW7FujTCW4eUpbhcBluEAOW+aAFbltz8RlbhAFVuo75D39vHboO6kBW74fV81v75F3cUW7ye6yBIHu5VsUdFL0z1V+9aB5fvYHps4QekH2RXkUPb3DVOUMHvB7PuA7y+9VN6zlO7l807jy0juH732/weGbp28TuqlG+7acSlDu7/ls7n2/zvd7wu58Ji7tC1LuVfc

u9qNcNSu4I7jlCh79Vx7xu/acJ7jNTbuHHAR6zuplbu4Lu+78R4HvdDYe+ke7786HHvUHjR5T1+Hme9QA57he/jOX6l/3fqqr9KZqv8p7Kf/rGrrHegBizrqlavLD51w6uMbxS2ktsb+TyiMN75QyMBt7gcx7u97yJVudD7ym+LNqbqMA4f475m6cNGH7q3SVZHzm7Yfo7p+9jvOH2B7fvsgSuFFveHsO7L1pbghUAfgHpW/fuVbnO5FVH5R+44B

n70p7C7AVQ26/vjbyNUsfgVC29BUrbuxRweinzp5KfMnz6Zdv+nt27IeEAT28ofCnqB5oeYHsLoYf5nmp5NvWHkZ41v2H9Z4IeE7ipSTvCFbZ9Tvw70pVsf7HmVTYeRHt+QSf+7/MRLuR7/J/kfq7pR7ru1H1R5Nuhnqe60ebnzu90fWNeJ7EflFF57QsTHt8XtKzH10Asf4H6e9nvgXxhX80Br6l0GWGdtJiZ2bzns61QO9/s452prmzJ6BNAKX

lyIUuFYC0ByQHYHiQhAWoja5lQSQEyP/M51lXO9qJ4B13zwhbk24hiUbF2YmwE4Hxj/gGY7KBluPWDxIYE54/dXy8h68fPScmU5WPXzlUPfOQV5zZVPXNm7af3Eol/f+vjjutnxxgbgLf4hv4gqAFDQeQA5ByXDg4CQxgrvlMRuJi8K6T2wd/w++PAj6bKMKs9w2Si2m8GDF/JLjmkN5QRSdDFwK0MWMm1zSMAxGXBmLmg9YuCj2tVWicT6OH1AO

gfAFqI4cBcKqB9QfABsh84IQA2AC4XAFNRTUWhg6OrYwNyeAXqAAhDS3qR2KYZKQ+OlpokQC095e2T0Wklfp7euUuu0Uky8su7r4ouO4lX2nPWPVX4Nc/PtjzNr2O7t3689dAn/sjsoW6ItoD34NzEgW5nZXlM4yiENNY9Cf1Y2FJCkU+19ESE994+dfPj1170L3XjPfai986OAfttdz4FS48qNvAQxgGbKDEB2UQ2F1zdYLWAKh68FuGEj+VuaM

3juNodbGW2d/jaF4bMmt1UhVVrBjzgugR0jYAYAbOEIBCKZ4H1BP05c7Zf1w9/Gm371i4EeAW4DpPdbNgRt90xpCt+luY8YnIoBjzd2V8t3P1p87leh3oDZevuCzY9Y+vz8lJ/OdXv87nezOEk6Ne3trBADBsofYVN2OU9TAULEgIBNHyJPiqOQucNpG+TcIrwRKGS0t7pKCPPXlA6E2tYFEAVYxUPKhZBAOdYH8JdclsDwB1NrGG1TjwFsACIY3

5rcVisTxN8g+OtxoHPxNALoD3xSAZE5n2s3QV3oogcuuO+AAUCV7rejMZM/15l1BOjdi4Ett8YzkgA6j74BcT4DDbROL0LvO42Uy6NcpThV77fs01j5HfbLj8/suuP3Y7A3eP1y+Lk62Ut6E/QL/iAOBf6JsFzWw9+QpaSWE6RmrkcVkK7wihslT9PfIroeWdP/P5e8xuwn2S1I1yNBS2o0sbiIxxuojNSxw0YAxI3IMAkbIBRhqOqgJqtibyeQS

fBjQq261f3JgDMAVNCYyb9jv8wC3k0nlK3ICR3XYzKtVjFqzK0gfO79Bsx3TgJ3cIfPSoKsgrI79IATv9HQe/7jcbSqsPvid3R8/A74xWlfjKb9asRA/H3Pck+y5/tFiPKE1eeVfWEyGs4cZIHENXLD7Xruf5TTpP86wX55RNtbbyyB1Ifnax4NMFvQzSMLPNy08tz9fIK+U0AMM9rPvT8koABqWM6u/dfQoIE7eDTm4AAyYX4cdyDbMRXAFp3g1

UeCS4n+As4zJzV08aQOqulBJsde5IZyIHPV1sCg3n8F/8byh8/lv5Fhk58wBj63R+YXyGopA69U5QDM1m1R7IN/nzR/vMUX8IABDvviEyNK0fqF9cDBrNlXhMXLMa0Z+TbqazomZrEHQM8afnJr9/V5en/KDGfpW1N/KTc359/pHsgz+C7f3gyd+lpyO1ufUX1Bc9UYrRwIM0Kb73sx+2VOP9GslHcaxD/yf5QKrN5rPEx5M+TRs3us1rF3tSbk/

2XVL+Gx5hU5ufNRhDsfXf/Dpb0PxV0AYhPyxSaiDN5E/RAG7fXa0esW/abTb8Fg4GzOs5rLnVrNZbFv7usSTQUw7/VtUU1L0PrSUy+sZTZXXlM/rEM0v82fR6y1M1VCG2qtLdSWYjM6bDyWL1ZdRmypsEzFmwccfKsMQe6/NlfE3NmFsvNgK8QALz8QnmFsbRgn0OvyqCc+ib+y1gVsJJiVsB/zuUqtjz85NhLMfZjgB9tmvMkcw+sPHinM5ti/0

WdmtsuAEqCeAJWk68kwWrtgQ8u5l5E+5kRG1pl9s20ny6gdgD0wdhz8odkqC1ANz+0ditALN2eq75lKG/PzYMzGkwWfALWaWdiAsIFjEMHthZ+kFkt+pdkUMm9zWUVdjUB2hh7+GLibszGic0H1lgsmgNIASuiekuDzTMjni6e8dypAdqklMYQDSEzokYAPQ0VkE+hZ+mHXkCRvzHM2gKH0ffxZum2kH+efyAUPmhb0GYDP+zgDlqnenFs+416W6

VxCeM33G+gmkm+22mm+fhnG+a93Sa0ATzcK3zV0D+g2+qQTB+T0h2+4Shh6+31++q7iUMAP2e8YVj++APxPuM/he+33nu+txgSsUBie+hf3qB+ATe+W33B8wJnysYSgO+qXgu+JJiB+FVhB+732eMaPh4CEf0as0P2assP2J0p7gR+YgSR+TD1Okxf1rsq7mx+vvwaMOPw9seP2yABPzl+TEhJ+ivzUeofz80VPwD8bAWya2ZQ3MdPz9UDP3x+TP

3+0LPywebPxrOEZ05+c2h5+RD0j+QfjtqIvzF+3OkaAkvx/A0vz40JwMOBp4FUeyvyJqavzxumv3EsigNpMlDyhmQv0N+xv3JwSf02sKfzrsUj0t+menJANv2UedtQd+kdmz+mf3IMw/3d+DgS9+pHmMeWwPD8uPyD+jwNr+qnmms9fwSCVwNT6ttTuBgQAeB+wKeB2+ixBoYhxBGwOheXPXT+8j0d+iLztqAQJU6Bf1mMQPjWBXgMbsMfxgAlf0

D+1f2D+ZP1U8HIJxMjfy3+zf3lsrfxJM7f0c8M027+yT296PgKcMfgKkQQ/0EeMqiCBPIjH+vhkn+ZYmn+QtgiBcANYMe1k0CcwSy8OgTv+ywSLsl1gYgS1husK1nus+/0c8R/zHMp/2lMP1kv+6umv+8wV2kLJk1MRugf+Hp23cz/yAGkf3psH1i/+nAGlAzNieU9d3/+yE05swAKZ0PNkesecwLMkAMt80AIc0sAOH81ZkQBkYOQB6OlQBjngw

BqJg1sR7lU8uAP1spOlDsH/1L0RALNsn+g9ws5l/0/+iLsVAL5ENAOj+dAJ3MHtiy6iNlVmrAJPMq7mwMQdiGsIdhoWvAOXB/AMfMggKcMwgMTsSIPWUadhuB3BikBvBhkBOdmAsedlAsCgJ9BK5nkC8hjLsRgI0B0Ty0BVoIbGugM4A+gNl0hgIAhxgJDMZgNW0gAOUc0z0vu1gLCAtgPW+0mkcBnHRcBcALcBygI8BooMR8Q1mtBl8n7+OsgdB

Oj0tUzoKeQoQPCBkCh28jjySmzjzhUmZzceZQAakHjxx2BZ3x2Pj0J2RKiiApzjneFZ0gCMDRXu4RgSB8ljY0oT1Xu831UsyQLiMmQJO82QNQhSSjyB4wO7AhQN7uZNwCs/QPO+/30u+lQOYCx4kGBV3yisw7gaBoNmGBm5jmBbQNu+pkNB+KkNysPQMh8Dyi0h1QMu+Nxjy0zQJd0HATshtVha0eoKcUTVhd0J7jx8u7kxACoNyeKP21E3v1xBD

IKx+OwKr+rRm1BSjkhBxwKek49zOBlPymBYgKPGtwIe0GoJs041kT+2wXjUbwPJmHwKjOFim+Bpyl+BRQVRB+N18Bov3F+wIKGcoILIMsvyJ+RwIV+qUNw0TyhV+80HV+HAG0ACINDMN4L1+tUNruiig8BJv1eCZv0tB0UOke1v15+FINJBazXJBsoKpBYUINUyoNT+lv3L+Zmgj8Nmj2B7Rh1BXlnZBFwN1+2UO4MvIIQA/IM+0hUNm857VmhYo

LLukoLHudtVWhLv0dB+f2eaVkIq0W0LrsD2jL+aoLyhC1hv0Nf2OhzPzOh8AM7BctlusxJnR0ZoPABXgzwhRAQIhvfyIhvgIH+9oLlBm2lH+k2DdBAMk9Bw+m9Bw/l9Bi/39By/zTBM4gzBp1hDBG/xBhEYJhhUYL3+j1mVs73TesYphP+UpkV0F/1V0KYIBslML8Q1MJBsYNkf+H3zzBI0MLBn/wr03/zLBKagrBCfkRhXNlrBoAPrBjngFszYL

5KMAPLMcAI7BhoKQBJoJ7BdfzQBTin7B6tjgA2APJ+I4Jw0Btmr69JkIBptmnMpAJoW5AMoBo4PWUj4NoBW5noBG4MYB2XR9sWEhRG7APPMB4KD03AOPBRdkfBUdnPBfwSvBjBhGhd4LpqkcOfBArDkBBdg/BJMK/BygJ/BqgMgh/4PgsZUnWB+ELZUZfywsoELHMEEPzhTABMB3YBghDnkRhlgMQhNgM3k9gJik9FSBmmEOH82EOgsuEMehRcKP

uGLhtBPdkxhqKFIh89ydBUYB5EIQOlMYQN/GxMPv8u3kgARZUGuoISxeLfBVko1yhCBL2pEk12KO0cF72yoGtIM4D1OQl33s5b2xy7ISaQD6yI+tDh4Y3+AhAPOGMQbciSKkxEOu0hX14hFwPo62z5OerS22Yp17eEpzMuAUVNcCxwK+abSK+v4RK+71zK+X1yneLlwsObl3ne2YHWoRbBAuLbCwQUbhDwg8AtezaTNgma2W2zb1D2dDk8O8WzCu

aF18OLrzRuEOxicplgKMRRiqBZQMMhtQKihGwLxBshl2hj2jihmoIShLILe0yUM6h3YDSh5P3ZB7OmYRi8nFBVHjVBAfwOhzIIFBrIJOhYfyfq38H28wZ3yMHEjoR+kNCkjCLSeoiJZUrCIkR2wKZBWoJ4RSUPahUIJOBciPP0wiN00dIO2hbCMkR+0JBhItkERbIIURCUzfqczmR27iNR2n9XceWU3YhuU0LOXEL8eLV1LObVwvIAkOgaKiJoRa

iIssGiPKBl3yYRNiLmhO0MkRnCOkRRiNkRvCNMRKUIERpwKERriOsRTgXpBGP3sRhiO4RmSJc0goIp+tM2iBZQCXhGL3p2E1yEsXZzBAeL17C7FzZcEmSmWqkCNizQAaOxEAl4FAH0AtwHx0uQEkAV0w4AS5xYhXyVl2AOV4A4FBKQQaEbA5tE4o4X3KQJ63pOn9kVcHWC+i0jEjYbX27eyaX/hDH1P2eX2Y+L52Heb52K+ar3HeGrx2OMCIq+jR

T4+CCLM4PXDq+aCLBA2K0eY2UCgutx1Da0n2RAX9ghAp1EPelMQS2ie0ZYqNzXh42Tbal7yQO172y20cEiIhtDNi1HEig8rElQcGBqoIJ15QjVBMQ/hCewvaktyjTAc+GJyc+4HyKOnFwkA9AHYgLqWSAkgGYAtQDjgPwDjgewAnC5IGIATqH0AtRGPhfn2+SOvFeiV9g+2r1HD2vGROYOzCeAfCFuwQr1xyZwgUO2rh/scUEy+e6ht28bQfOLHz

ARVyIgRNyNK+E7zDW2ryeRVXxSidbEUw7yJ5yu7yhyt9mNOc8BuOFDixEe2TfIHlFBRgmWU+NMUhRFCOhRyuWiuiBzaiU6RvelQEMQuwHMQT2DPsGsD74tTGvybUnpWSsBXSxsGEIQpFhApKLyOdBwpR2J1c+2RGYAjQB1iWcB4gecFqIzgHKIxAHJAawDzgMAEnWtwE3WfKNmRf0FeiBeX7w2mFbkUKTSg4ZEKEhvBDSA7A4yYrzEYZOE0wEpCm

4Wwl12ShwGQrq1/hdH3fWJyPlewCMVeFyMK+WqKIyOqKgReqO/Oph2neXu34+yfB2WZxw+RO9E2AesAzy2CL+R7KRA0ke24yoaFkYoSWdRXh0deZCNU+gyRHSsKNESWn2QO/qIo2v+y9ChsDsQjzA/wF2AvAGsHDQvyFcICsDVgKtBFQQaCTR8sRTRhRzTRe/A62x0Szg4RDzg0zGSArqGVAzAFqIbkFyIVQCgAGwH0ALdE2oJkXv4yuziAFCB+A

YnGDSk205i2wCHU7wH0w8KWM28XzOWyUGG4TUHigsaFzoHb1M2z61HRcx2P2qqP22Sx3ORVl10Op22uRY711RdyMnejyMjWzyOq+HBCBO0+3EKA+RBu3+3mII8FrWboUk+c8BFyAV3dAHMCbgzcEMuJNDi2KF2vRyN3IRZ70wu8B29RkXB3yeF1OwlQGPyg8GwwTTBuwDEQNgetFbw9Qn5wnmLsQKaBfIv5DQw2AC8g+VwEAlBwMS7hTJRxyWc+H

FyTelQBgATeC+yXQH0AweQmoTLy6A1pBWAmAFqI9L34OWzBbAHwA3OnNERAnMU02t8PPApH2HgKhUTQEuFuWMKXbyby1YyhyKYK6qLVRfGLxShh3AR86LExi6Ikx+qI1Oa6JeRH3CBOAH0UxcGyREGfGwQH+AvAvyPEIuRXa+5CEp4bSBpoPXx4S4KJPe7qIsxnqKwucKN9RWW1CO0cBbAAMENo14C7WERHUysIFS4KaxQwTcHyxI8G8IqR0Co4G

MOSkGITeMWPTRZ2E0QmkEwAM4FtSqkBWAgXjYAFrE0g8AFUgyoCHIWHz64hGOzoM3Ghgs3DXIjnEMw4IAKxobCL2VJ2YyNq0Ro83HJwSpAhAVFzlca3CDiXGKjaf8N4xICNBoU6Py+mCVnRKr1ExTm1uRtRWXRzl0q+8CNkxgJ11gTWQtW9TGmxqK0SS82O4AjXzJCsaARuR71dRWhQG+an3vRlCPS2Hr2fRiKIDR86huwXrGouXK3hALhC+AGiC

gY/hBIwvAjuwBiCEifeQIgYWKb2L+VjePGzA+UGJc+MGOyIMy2aAgwH0AH6TeREOKtkp8PfiAuCSAPJyygUMGdiEORXIcdDUxnX1bkRzFfhgbXDQ79keOaXyHRm6gy+Mr3HREAElOrWLJxWSUuRNOO1R3WOsuGoWMOWr36x4ET1e7lzZxIWPjWSmONeIlBi2H+AaSmmN4Ag6JhuLCQeAuUV0wSF2lyJmMJWN6PFxgyRI2NVzyQag2WKNU1I6kI0a

m+g2amhVQOK+syeKpgxna5gz+KvU3oazVWsGTDXaqSZQ3a1VS3aA5nxme7UGGJd1s0uXk8GFoNL0PgzH+N7Xumj7WfapI0KUp/T/mzsxnEt0zAG90wf65+P9sMNnS6R7QqG0w1emJHQ+mBrAmmDQyukv0x80oHQRGqBhYBAcPVmQcM1mGIx26HIkyGuXkrAoHQY6R7Tk6HQyBmsBImmbHUvmYMzAqcBIhmQwxB6N+JMWq7nTGGBLGGuLjhmkw2fk

lQxmGfEDmG8iEU6SwyukGM3U6WM3WGdpVzKo01DE9HikeTolJmHwyjAA3TVKL4JgAsXVDgipQC6bMygA+1SpmKDU0aXBMC6/C0uqIXU5mYXQBGpjVFm5jXkJcXTDE0sxP8ss2xqNXQ3xL3Rd6RIxa6ygBfagUgm6IPXAUfBIx05Fmx0+hJlqGfTMJn8xZG1mkEJI82jALM1ZEsYwihjPRnmcsycU88xTGTBO568dW5mEiwn6LIyXGONRXmefhXqw

Tkq0oNhgAJGgaGoAysMYUIN6ME2j+uBKZGWAB8I0YnR0Oo2YU9Zw7KV429E8tQfxMjQwW0fxPGmfQVEeCyKJ/8m0UJTV20ZTRIWJfTIWu2hfGVC3fG9C0/GTCx/GLfT/GbfRHKQEw6AIExGAYExGaA/R60wiyNqoizgmYC1CJUiyQmkCxhqci14MCiydqvE2MCelWcWZ9RUkngSdEqV180ydTcWtul+aEk28WgLVkm0k38WEkwEq5dXUmGSwiW3h

NUaukycmzAwMmUCghawSwZaulRIGikxCWxLREq4SwRaWSyparxP0mc9XxamMihkC9UZaAgycqwUxPq7YkcAFRwUUvEmAAs+gG6OFTEGkrQ4G0rSkGoGBkGirS6WYVVvEiiJiBMDRyqSxTiqPeK0G1JNlKFWgMGQ+J7a5DTHxnU1na3UwsGi7SsGq7XnxwXkXx3VRGmWw1DEOhMkem+M78MAG3xD0N3xc0wPxd7UCGOfxWmJ+P1BkOgyJu0ivx+Fj

lJJQ1VJl+NOMj+Immz+MRmb0xCAC4HfxFHW+mONTgJcI1QAf+OVmzAKPMwBL3BBEkK62s0gJ4pOgJSBNNE8BOI8aBP3KcBNBmiBLaGBBJq6m2mwJmpMbGTs3vxHpJZE/Q1hmwQxIJhSjIJr02Rm8w1RmSnVs0R7ToJOajWGOM1TGzBKFJFJXuc7BKS6ngxFKPBLYUfBIEJSkCEJrM086US0VAEs3NJIpT5mDkwFmqhPeGgI1pQwIw1KbZOCJ4I17

xMsw9meI3XxopL0JwegMJyXSMJTjRMJjhPsJDvTdmlhIMmrMLDEugBPAdhJfa5hMcJzhNTq1PVcJY8xjGE83pMl2gTGLPTZ6/hI8a6Y0iJL/2VJc+gG64RND6UC3D6URLwaMRK268RMEMiRMFG30OFmLY3vB9MwjJofiyJnqFuqeRMvkBRPSqpZRKJupLKJ1wLT6eTRwWBTRqJZ9WcA9RJvGRC0+kzRONGTinaJlfWoWtsLoWdfUlqX40b6nAGb6

lon6JitUAmHC2GJXCx764EwmJetSgmw/XXKYi3H6N5MQmd5LFmEFRWJ6zU9qF5Q2J/ii2JkRJcW+Yj2JTEgOJRxNTq7i0pMni2LE5xLQqvixBaCk0RkdxLQG0lVoGtk3XJdZPwAMS3yWcS0+JKk0KWsJN+JylJQGVA0BJ1k2BJTxP5m/Cx0pBA0hJKS0MpPxIcqtSyPq9SznEk2Cww9KgwqGJJZGWJKaW4g1xJkg3aWsgwkm8g3imSgwKuHiJnyl

VzSm6Ow/8bEPzOASM4huZwKmROwCeCCIiRFO2DOlJPgaGg37J2gz0GDJMHxGDUna7U1ZJm7QnxbECnx/U1nxg03Xaw0xXxLBNQAIpNxBYpKWCEpOmmUpPghvg3mmh+LjJTEnNm15O1JfiHVJm1hwJ/5KOspRNOqV0gNJ0nVfx701qGn00/x5pKo6lpMVm1pP/xOXTVmbAMdJaIy1mmIwgJ/lSgJMBMDJyBMBmbhijJghn9JF1NOpnpMwJIZJfa41

LvxPWnwJyBJE6FSgmGEnVIJL+KRmswxRmQoDRm6ZImmmZLO0gjVZEuMzzJ5JTYJ8DU4JpZJZGvBJZGlZNJg1ZOVKIhLEJhVK5mihN5mujWspxkgbJKNKjAUXQfJ+NKn0GhKS6g5KcULVJYR1mlHJgBnHJ1mknJDFWnJ85NnJFhLcM1hLHJthMZqrNM3JVZJcJbhKkmBpSnmDjSeJiY1PJbjQCJF5IfJahJs8oRLdmHFIzGCCx6CL5ODmb5KQWSRP

x0KRPvmhvV/J1i3/mLs0ApORJppac3yJcZkKJZ9QHKU1PQWMFOPGcFIgA542LKtROQpyQAaJq2iaJD41IW/42wpTZRoW+FIlqrTSIpMtSb6LCwVqvTUopnfUnK3fR4WioH76QXUgmH2mgmoYmYpsxPnGki14M0i0AMM/Vtqc/QwmfFJQWX5M4p0C2EpkOnga4lJEmJxLEmEA3ukUA0uJfiyUpokhUpYSwspmAyspWlNspBS30pUkkcpxAwCWfxPL

q6SzUpmS1bp2S0YGYJNiW7xOFa5k2+JPdIkmLlKEqblKRJHlNRJ3lMxJjS3V84U28qgVLaW0Uw6Wd9TCpPSwXhnBA1aQ1w7O2LxaRlak3hHSKaRXSMHO2RDa4qzHzgffEWu5b3NoT+HfwO52AIaBURxOa3Jw7bDZg6R0B4eu0S+y23Ao6RxfWgcRSyvAmVRvkWy+cbX4xFl0Ex7WPsunWKu4dOPExDOO4+K6LgRMK3XRUESBOq6C3R5qMqge6KHg

fRTYy59j5xmMEDcqECg0l6JIRTbTMxt6I4c7eJYhPDjXESQkac88lwARgHpAmvgtEa4i+MvoJmCIMN80qgR/cZQNy8mMytEuNhIArolqJPHg+kPEj4kAkgek9ZxekEFNwqa4jI0cSD404vnpAOHil8Dmhp8elS7qoQAYkIEjkkBlM7pCkm7pd9QEqZjOcAFjIMkUJPbE9lP4W0JLYGuMiQq9jIdETjMDBS5VbBrjJ5kqqn1o4+nbEXjNnp8JLqWI

UzXpigQ3pHk18qpSwcZZ/3lMi4iI6QUCr0roh6kCkgoksg3vqCgwHMc0n1Ji0mWktpIAJ9pJ2pIUgK66I21ma4i8kLOgokV0iAkTTLUkThKapnBO/JuNmemc1MEM18mJEE63DAqpnkZtogaGqRI4AkpkRk3TLiGisgA6GQD2m1mgAA5ADJ8gDJIXpAxSPtB3oFmeBZ0ujMEeRHUzcvLiMnFAVI5Ol7l2esMpsgP1pXxCFMnNKvinxI410zH4SJae

eTdbBfi/EK7MRym0z8yR0zVtK8z6GlkIgKSLpcvPFUwKWrYIKdM1xybczQxARNTDFWCnFG0YJmdGJdKYrJR9A5oe/Mcz6lvEEf+uGMPDCsNoPJdIj2hLIlESoMYGuwy4XG0BuGbwyJGiI4OAAIzn5EIzxSSGSSlKIzJgmoFpguKSpGbdIZGV9I8/Or4FGe2IymsozfpKoy4zOoz2an9JClFoyoADoyMPDYF9GZL59asYyQqj4zzGfSBLGV3TrGR4

z3Jkqy/iQ4y/GUpV1RG4zjJJqyEltqzEZLqzVWQLDcAPrUDWcEySAB7gyKdUs8KnPSXKjEzsSS0surCUtBxMky0PE9I0mfoAMmauIeRNkzWZHkz96YUyZqSUzNwSrNACZ7pA4btTQCbUz6mV35GmQSyrRC0zbxJ8zySt8yOSl0zNpj0z7ev0yYAIMzQWYoE+WdsztadkAEWfSZEyYIYdpnMzHxLR4lmYpMVmQ2JLWdazWdFsz2dDsyGWZo59meKT

DmWGJjmdfks0UNBzmSNJmboiSbme0y7Jg8ykxq40OermTRAT8yLuvOTIWRaNYWb8ygSv8yjaUmzz5qBSzaeBSxWeCzTZpmy5tNCyOKSKYHNFWykWW3C2jGizbRERY0Kpizh5udYh5mP1U6r5o8WZRIJpoSytcMVIEznRY/2S49YqRjtart/4vHoEiUqb49mrsTs+IRlTgniSyOGUEAuGTwzSAHwyaWYIzaTMIymWWIzGfOyz6CdIy6JLIyS2Qk4+

WcIo7xoKziJA6I1Gf/1iiZoztGfgBdGbKyaWnYEPtIqzvGTqzfGRayIAOk4bWUfVIWtPS7GZxyVWaV1nGQ5TDWbpJFJEZMilqazRJOazROf4yhFoEzhWiEz7WeqIImU6yoma5TXWf5ScSSYy7JN6zRfL6y9+gGysmUqAQ2UST8mTRII2VB1Nqf7DY2Q6SqmU6SamQdS+2e1TWZOmyimdRJWmWuzs2dtVc2TWyC2ToQBmcpUSORxIy2V2yK2eMy/i

VMztpjMyEhvWyQOk2yyxC2z9JIpyZxO2zowJ2zmxruzMuhAA3OSzpTjEOzTmaOzBHOOyrmZOzRGlmyZ2cHpHmQuzJaS8yV2R8zfOReyr5KZ5DabdVd2cCyD2WFziicezmuqeyLFOezYWWGJ4WYpMb2SiyPtPezQJI+y0pM+z32cHo32dM0P2V+ymmei8Blo0jwQszs2kV4UjWl8c4QrfSzsJ6l98OxANgFLtpkYewyTnliZGOsII0Nix/kLudAmD

eAGkJZh6QtDA2KAjlIEocBFdrCB1tmVdnVusRicWOjxTugB48fAz7rhOiNUR1i50agyOPuq8MGeV8ePoaiWccai5MUARbDtitTgMARrUdpsD0XaiRKPSdsCvGk6GU3i1sU68NsYN9UNOjcYGh15hAKyIiAMOdSwUvcJALTzRJAzzyAFXo6IZ4igOYxDXHnFTszglT6rqiRvHlBzuIcc5eIeA0ydhAFIkZUBWefTyiiBzzTUWmRj6SvDr6Ti89Wjt

zxrsa0plhZAjAMqA4MLS9n6e/FPWFsBuitXJRsOa8TmMZhEvoVB8UNOQfYpeEWQrxws8q3J9gOMQpjpHinhNAy0MrAzbrkAjNDogzQEdDyU8V1i0GT1iEeQ8ikedJijURQk0ebolRscu9xsWCByqJEUv0OvQu3hylI3Ga9qLsl8VsX2kyeS3iKeWp8WGS6dgzgv52eUzzHQMojZeW6ZmqQrzK+e4iAOQs4YqWjtQOYLyIOclS+pMEjYOZLz2rtLy

sqTXzw9BXzOeS2cGke2dV4crJ1ed2cxrlvDOkSFwplvgAdgI0BBgFnBkgHnA44I0BNIG5B8AJIAEgC+l5mDwBVIPHyLuSud7+PUJ+GP+pzwmNhCEWVjeAGDlycI4V77K8AnMHrsoQHJd38B9tELt/DoCETjveeod/eQJjIeTOjNUSHzYeUqdOPkujMGUzjkeTgzBsXgzm4LYcY3Jwx3DqisyGdXjywPNxn+QLg8+ce9yeSjwoUUIkvUTtjbMeRtD

ZL+wbCmrQ1Lh/D9zpbArENggxADysWQPKQWmKSwFMVkd9EsbiIscmiRVrPyrMu9jKgLUAKAMss9UmsAjAHvhTgFSA4cLztfyFnAnIO4wy3sbzJsU/gzmDTRpiIWFJtr2jtgBaclYFZhBGI7y/ZBydmUpcsuaN8BW3hAyXVr/yY8SDySiox8zkUAKhMc9cUGedtw+SBsoBQajo+SjzY+Wzi69ku8v9iu9zeUAQBSKgK8eeFsVyEnlQiolkSeUp9TM

f18i+XeiJMhp9e0k+iEUftj2YuARdsswwDYP4QMMKtk+ImbFWgGhgbwPygDMRzB2UL8gnsW/l8jqzsLcW9ircdHAjwHvhiIFnA4dF7RZAHAA84GwBBgHdgw6F8BcscbyPgOkVL0OzBwKGislXDQRy4tCAOktOR3DjrBasbZgg0EG0YYL/ENiAR9I2JYKmsRbsbBaciKcYHyqcSALCMmALNOPDzXBYjysGczjYBaziJAECdwcSgii8cJ8Z8pTh9MI

8wZscChacJmtwUqcAaCnHsRcTEK3UfgKPUYQLtsY+iZcSkL8LobIhSJlxcYPhg8qHohMoIPgOGPrQ7sPXhVkq0A1YPlQU8iy969hwK0TtQdHPlFjU0ZbjJhBABkgKVJJAObJsKFfEqQBsAnIJpBmALhwqQL0B+uPhj+UXLtXgDK574ZIcsoG/hHuexlLeOxxIihvQf4nMLUsF3g0BeYK9WiJwrBccithZOiA+fYKkGe9cnBc7t08a7tPrmqcPdj9

cBsZcL0AECcLZGajQbjvRHZI8wN3hXjvgB1kQDu6A8YL8gY8LFtiEaTzSEYwzW8eJkYUVLjNPiCK/UXLikEM7EbwE8LgMZrAyeBwxsYNVQ+ouJp9YKtk/gF4RDUiiccjkKtuBZicCRbUKiRU5A2gOMzmAPB9Tjn58rua7jMCtMQgiHdjQ2PHkQUMgVFdrwJaaF/Q3IrasX7OIwnQj1Fsip7zRcO3ltttdcgHDl8E8dOiHBWscYec4KVRWCtM8Y/t

s8WUltTogirhQkByaIQyDRagAdwuegQ3Ju9iGdJ8hCFgjQ4nisG2qFcGGbEL/hZtiqeVQiKSfO0qSbmVx2sPisGoSVL5FpDrASFIfBmYASuqlUWpsPjiGl1pSGrtJnaUeKqpoTNsHuO1tAAoA2CSyTTqmYM52pyS+ptySbBrySi/PySvim1owaRNVNhuSV2IF2VOCacS8KqeLV3BeL0hDZZcLGeLdpBFIMKi90ClNP0j2nTdmABhVQKb1Zx+Snp2

OiRLIFDhKnFJ3U2CU5TixAoBEJeeKyQJeLyJAfTmeVtQu8WJT0GkYNnxYsUTxUFZ0JTOJkJVeLGSSVTaFiVUBPChTWNDlSJGm+KWph+KvxVV1yqi8Vx8X+LJ8ZYMZ8TyShpjO1wJdjMhGrmSquXNoYJRnpJSR4sQqgxLdpEJLtNGhLV3JhKOWmyTKJb6SJpvhLCJZ4SSJVXdaxuRLKwA5LUANRKZJbRLwxPRL+JUhKmJShLwqbUj5QP+ynHi3yfE

awzMdlBz/EQ1dIOV3yYOelSpeeVNvDNJL9iVxLWpjxLWRHxKutAZVgpSiEUJdeKmScVUSGpEFJJRaJpJa+LiqTyJ5JTJLvxcpK2SZVSF2gBKNJUBKtJWySdJYwSRGmuyjJXBLK6UhVzJYJKQpSV0o6gJK/ELZLsJUs08Jd7ACJcAAiJVZo3JUSUmAJ5LvJb5LapTPSApSNK/EJZKDRKxLR+Rty3JcMttuTPyr6drzDuQILJQOBRSAJpAxxZmLhLn

MimUgEluQvfDjEMTwKMUxj8UP3w3eXK5hRXdAQ8cG0P7BHiaoBCF4Un/ybrtKFycXKKZRVDzkGV2LlRcJjVReVl1Rd9d9jjO9yEhjE0eY6x9RSpjDRb/EeorajgUFClYLu+gRuCEkkIlEKgdr8KxcXELmGcN9IdrA0qpt3jViodUMtCJLuJVlVKSWzKEALtLcAKVLRJXeLF4A+KZxE+LFJRBKIaQZK9OjJLYadtUZytuyFwHTpinPyV+ZUuyPOrw

sdJvgASaXTMzqjjSWyfwsdZTzMHhkTSQRj2SryVwSPCUeTRaSeTkxk8yuelLSeer2TrybPoOuYd88CchNFaWcUkyhM5YiQfMEiStTkFskSC6Zwp6zqgp0HmGcjHBC4eICeA+FJ2BCfogAmJDBCxmZgs3ZXTohmRbT8wWUMaauUTdaZUT4KVn1EKer5xZYQtGicQsPaS0SvaRQsK+j7S8KbX1/aYwtvxsHTfxqwsBiR30BmpHTuFr30Y6XwtxSoIs

MuYxSRFixTTjMs15mqgBv5LRy8xMnVKgdxS1iWpI5/vBLZKZAMDyQpT5JiZM/iRqzUlqgMm6Q8TLKZpTRCUxUx6TezDJjCT/JfxUN5WQMXGf8SzKfwsgSS3T95aCTclm8S56oJzAplpz56Tpz16c0tL6lvT8SWLBCSZ0tQqd0tSSW4jySdlTdxblSe8U1NspYeLuZbuLeZfzLBZUYNhZW+VKpS7SJZbpLwafpK12WwS5ZadUFZdkSlZVj5/nIgo1

ZQLTHhrWSD5S8NxCYY0saQ8NmySPTDZebLGyUoTOyYXSXqswqBaVbL4xjbLClHVzF5p7Vl5tLTV5rLS59GnKXqZ7LIiUrSQvCrS3Zv7L3yYHKNaek0ogc/JQ5eSVQXFU4o5e6YY5bCNjvkIpIQcnKouanLFZe7KQpBnKIKVbSTyjbSNzPnL7abgtHaUhSUKaXK3aeXLqyp7TqmnxBamjhTOiQRSA6T0Tm5X0TW5RRTBiVRSRiaoAo6d3LuShBNJi

YPLpicPKnFgJMx5RPK1TOr5ABjPLs6ehMNmphNgBlJTNrDJTwxHJS0pKvLYBvXSlJhJJglo3TFQHfK6BsPScBs3Vx6S/LpOUZTe6YjIJOWjIt5TfLjJNUqNKfZNGFcZJ26XEtX5XCShWgiTRWrEyEnPEzf5cFSiSUAqSSWGIySZFSm+clMIpcBzW+fFS/EYlTEpZ3zDnGlTQkfxCEOeAqOJfd0Maag06pTlK4FceLVZUFKBApzLWpigqzmmgqyqp

LLsFU1TcFSWT5ZYT9CFaYrdpCrLSFdcrdpOrLtGmjSOZjQq3hkLMpCQwr9GqCr/hiwqAuqbLuydCrMaVnLvydwrp5oNTfCXOyF5ouzHZUESLZbH4pbOIrJqZIrhFU+SWWrIqRyvIr1aZ+TlgRt11FRU4wXFor2vH4hdFf999FaYjDFadV3SnTVCVau5zFWKzLFVH885XbSHaZeNHFegrnFXcp3aW4rK5R4qSujXKq+gIY/aQwsG+kHSSKSHS2FuH

SO5erUIlXRS46TEqE6UxSZiZT0R5YkrEJuPLc/MJTp5WgBZ5bnTJKRXTTJX81l5T4ta6YpT15a0rEBgZTKlfgBulVks6lXgNj5W5MElsZSCKmZMr5f3TqBrvL75b0rH5fUqA1bYy35SMromYiTxlRxJJlWC0optIMYpsSSVWiAqIqYvCVeZi81eefTGXJfTosXPyG1MS8Otnvh2IMoA6gA0RfPk7iRvjbIW4P6RmMrlBaCgRhwvpoLm3nFBf9n0Q

rIvoK51C2rzVmttosjGkCccztXgGMRsEHCAf4kOxD9lKLScb7zoZagkdhfKKg+QjLQBd2LkZb2LHLlnjS0jnjcGQOQgTvIK8ZSu8EQO/xj7J5R5tpny2aEHIShB8AcBaLii1k6L03NZiRvtSiC8eQBiWcGd+rkjsVyFCAUQKQyO0kVB8UNFLqrrFKwOXmcheSBoReclLdlRLyyzuEiDlZUA/1X0sx+UDMtubi9zpWWrr6fPyrpRIACoE6hNAFawb

IFjET4QF9dqLeAAkk6Em4P9KblicxbePtQe4PfYnlnuhDrhsIXgLRcPlvWLeAMhBieF+xLMM7IgmHUiScc2L42GDz+3v/y9hcHyDhdurnrtAi0ZbAjzhVqdc8cOKdRQkBBLmeqk+aThQUE5E4vhXie2OgKZ8mZhnlgzQiEYp8aZc3jHRfTK31dTyy+cyraRoGZ0FM1dv1d4YdFU5q09C5queUehFkdUgVLvxwU8uBrmIaXz2+bjs4NTsqeISTt9l

f3z3NY5r7Zl5rmROty2zphrTpdhrS1QmLy1dVgplvoBPaBwBxMKQByQJgAjAE5A5AMqBk4EHQrEo7o+hTrxHgFoL1Nm1g77J2j6cKThY0BIwE6A+tZXJsBPuYtsLruKLkyAMcNhfR84ZW2LKcUnjqcXJqkZQprIBacLoBR4KLhajy2cVMjgLncL6vp8iQ9u8AqZbOLK8QoU2kPuhXYk+raZS+rYqFjy90TiRUtuDtpcVe8PRakKJAG3gLaD+R3Dj

sARUCUJ4MEJFDEM9gPcEiBQTgcwVaFrAOIhULaDjwKr6VMt7Uk6hw0vJg84IMA44BAx6APQAqgHnA84DOBsMDVq5dheAZuNNjLmLRdNMGML+cW7yLmDSEv0XCQ40lfYRhe2rwcmfYlXE+slGNxjjLkuqxtSTk11SNqOxfKct1VNrlOIpqnLu4LzDgtqvBSOKLOOOL8ZUWKjmJ8Ba5GxlSsceid3oHg4QF8AtMN2k7RdELrNeuLyRJuL1Ppdq3Rdd

q9sWCKIAOzAVaI1QLsNcLNMJAwINLYhqOFGlVECRgdYJ1glkh8BAdXG9qha9ixVrvDKgBsBlAFABngFAAbIOxBJADABGgAkgepJoBaiO8VsAGaxUdXMidYE/g6Na2AxcIEk9kSatgiNFBeiNRcBQkrBw2EejfousRw3ENrY8YO9RtbsLxtfsLA1qO8w+T2K79mqKudQOKINmprkWECcvuILrz1SVi58ter7jlHsLwuVcihYdqldX8KVdZTy1dQ+i

rtfCibtdrrbYBOoXMXBhVEOJpGqPrQSMC+QCoEAR0MH+wR4Nog2cAbq7dWbjezrhqplk0BnADUQnIEYA44E5AqQHvhmgHHAoAEYBkgCRRJAPoBMRcyLq0TPloQFHrGvpOQW4KnqTVj61ujt1lbhO8BX9Qxib7A8xGsaJrgedKLc9eDyB3iDEWdanIi9bTi4efTiThZHyzhTALVNUeq0eanx69TpreAE3AR4LTgXhaXQI9lLrMSDa9WKOXwLNY3jF

dQXybNRuLe9ZLihvu+rkhUPr7MRIAhIpbBnZHxFGmFQgyLkBqNYMvqEBGpjKQuJo+IE9g19aB8N9Zlq+BXULKgLkRpAMkBlAMRBmgKpBOII4kshFOdsAFSAegKpAbhay9IcQIcYsuVQ/YmeiYcicwVLpy8qLmygotge9f9RQywZSllWwEDyeMeJr2xVJqWsRAbvwlAbU8SXqd1WXrUZRXqD1YOLq9UNi6gF5drVr0UQhSJQfomTKsebxk5uJ3ryD

crq2HACK+9a6Kkhe6KtdQwb0AJadEQPCAyqKMdXgMRgOUGrAPcDQ4iMLvh1EOClAGEIaqhebjHdWIaiRRQAejisAnUFSA11nyA21DwAnHBS8EgMoAXtn59ZgKucbXusJQGO2rh+OZrb+TjBmNR8BsoO1h4srcwUcol8BcCedTrsQb+tQgkmxfecWxXAzHDW1iN1YqLEZTftS9R9cvDfurBCoeq4BceqEgAiIzjpaFI6NaFmhP64akhQgYSBLrwUI

AdnDpQyFnDjAaMfLrLNZAcjtfhtX1Rdr+9d0ldBAoJYwuBB4wjBBEwqYJsIDMaDqBach1KDLQTSWEPEHWFqwoxAmwrRAKwrWFWKvWFWwo2ELyF0IGwnxBHkDJA5IOIRM3LtyrsrFizIAsI98M8A84MkBzjY9KXcTrwQ8Bfy4oNRcseUPBP+Jnw4gJTxf7MTxucWedtNmyFm3reB68VpdeNfOoDdpec2sour7DQUVWxaAbpNQXrZNa4bQ+TAb0GXA

alNVJiedUgaTjWjyy5GgaK5FggB2DLr4BKQ4W9U3IvQs2BcEdTLvjV3q6ZQFxykJpkAUGCg+4h20aeYooVwGwANlKDY5gCpJHxFooHtGmo0HoW1q+SzzPTT+BvTURM/TfmIAzU6ZgzVY8fNb2BK3tKaEUniQlnLzyQOesqfHglLheUlLIteLzotfBzYtTw4hhMKNBAD6aZdP6bvTfGbenpVhktSfSJ+T0bi1SztKjcrFLpZWrsiB0A2gEfrMAKpB

xkflrciPhplAPoBk4CsBmAMQBnAI7iT+dh8bZI4UC8gShUIH3xX8Kctu4NQUDqACgkQECkghYKad1g8wLwJDLNjTDLABczqFRXsalRbsaPDfsbVTt4ajjb4bkDWzjzuStqxsUaawbvQUW4AIJJdeIRH7LeqSorrBm4IWFhcWCiHRbEas8E6bTgMK57hAkaaDcQKyNpIkIAFPFVEAcxNgLtkEMC3BW8IoR8qFhhhUA9gg5MrBWGMUxyjS9i94gRr0

AHsBVIGsAMPHnBf2M8BiIFAAcAHDhbgLYYmRLDow9TWihCIsQsoG/YoyOQVJuOesGkGyawslGQetWARaGVYa/orZFADXYbVjYnjGdbDKQDWearzRea3rnsbOdYcbPdscbtRTXgEgJWiE+X4L0DfsBrwkcsQjaLgwjRaKzlkGiVLpKKSDfit7RWuLu9f3JwLR9EM+VtirMbBbcLqQKIAHlRDaD3h24EbrH4QrBkRQZtmvrQUAYPKQIiFrQSMCNj2B

QKtGtriLIsQ7lN9aRapAHnBNIHag8KOLxk4I0A44NkBkgFSAbtKQB0MGxbc0GEUAyK9R/zRKxwvhlAJXk/hcSNiwDgICjw2H3wHmAZrF4WJqZLQ4aABQgz11TJrN1ZNrLzdNresYzjudQcdZ3nqa2cb65DTd+pMWMiR/za1anjc2kZUNa8/uK8ADzbabXjvZaHTckwnLZBb/jYkbpMskb/jqkbiRe8BXCAoRg5EbAAiExtIGPBhW8AYglUgdk2pM

5i1EkuoiLcDqkrZ2bo4IPsqgJgAs4OLxFxOA9k4BsAd8MuwgoFhxirQ1A0IAkUnIgHjyMf6wpyCkA3gNjlaMWvRdzYPBI2HnlZTR1aGdVXknDYpbHBTsaVLVea1Lf2KfDVXqHzSOLTQtprXzZjASsXua2MlXjfzdCgjqPfDojSBaHLWBag0c5aoLdQatxQPrdsUdacqLeAOUMrBzELOCbsBhhcoAxFrwJAwN0n+xawJKgjYFOph8NGKqDibi8RYl

bRDVMsegLgA3IDaxmAJ5pNIG0AegLUBaiCsBLWMRB6AE5BfyBDbYEtDAMddQ4dEERdP+BeFHImzhPgIxRH4a/C+iP/qlXCsasvjjbrNgzq/VuebCbZAjVLTNr4DXNqdTX9cKbRpqYIlNa7Qi2kkbdUJOEmxlG4sZrKoDCAmkI+r1rbac+vhzam1lzbdrftzJMu5a/jnZjq8JBcgxTuEyMOEQ8qLVtoYDZEXMGzgWQI0wdBcVAKDtkc1bVwKIMe9a

tbclapzbkRGuGwA0MKE4i/AuwnIJIBjYsnA98O0cq0eHkTQEFRoQKF8kiqsjCxasAOaJvs2ReMRzgBWLIEudreNX8BbDXTq5Tfnq5LSeaFLVsbQ7WzqBrRzrI7Vqao+THaxrVpagTja09Lcpjz1U3APtoYgb+V+bgUC19M7S2lV1GoggLS6ifjUlsqSDtao3HtaYLcCLNdYLaoMLlB7sJbBIiPWs8qBbQNEPlxB8Da9fkLjAChWVQRitFk3rfGKa

hU7qqUegAqQKmA44GstngJIAs4JpB6APgBngBQBh9jAByQIMB8AFWkF7fAUl7RbRQBAOj4LibxcdfZFf1IcJRTc7JxjfIcD7c1qM9R5h71oebZLbjajzcqa+raqbDhaCxYDX2L1TmTbdXnHbtLeRrqbdNaBCAgJ6CgAb/7Uio8DfjyGxW7EaMbaKvjRta7TqBai7ZpkS7ee8y7fA7B9Skbq8PRFcYCKhd0RcBIGPRd+BLtkhIjpgfCAPBawF4QhI

pAwC8Q7Bu7eFjB1hUaRDWQ7qjRKt2IBAwcMVuxJQE6gnIPlsssW5AqgLhxNeD0bCMaSw9VuzQlCjcsj1vZFsWNFAILblB7gI8dDMRAlO0AG0VNnswuRdaKY0Aow9XKfbsbQAiFTRsbZLSHalLWHaF0RHahrW4LK9Xo7xrSOKC4nV9LjRwIuBAZbWGDJ8JwJ5RAHUzbywP3Am4MIIG8bZayDezatrY5bi7TA7S7YkLM3ECaYwuBAzBGCaTBCCaJgO

MRZjb2rNzo4URivuxwTe4h4GMiaMTXiaqwn86xyFiaWwu0JCTWiaQXW2ELyMSb5IMCgyTeNcpln8AKAHDhmAE5A84LV9G1VmLfUhCBkQK/YL0G2ByrqHEu4H3wIyHIlikB0lwUoOrCCrrBiCq1kFjd/zPkVIdioLnRhXCoUT7VdcBnaDzAEceburaebr7WM7b7UTbBrRHzH7Qgb5tbqbX7QkAqEonbbjUeh1XBwlobhXi49UA7ykB1h/omA6r0fa

bjtY6azmIq4RNXA7YeEzKKzVagxTASU2JdfAQ4GS4E5UmaVuEfZ+cKxiPgGdcvEUxD+eb4iczZsq8zdsrgGghqizWlLKzjw4jXZa7TXUdKUtcNcz6RvD43u2bS7Qi6YAHxFJAEYBPckbysXQMQ9Vh8BBGN/w1tp/wcRAXlYUHPrioOYau0YjQA2P6Q8HZClrwgDyPMH1q2rUAb6dYM71jV1aIeby7erdsaBXeHbibQ/bbzRpb7zXM6NNVUlpXdZx

RsDutG8DgaGoFlBM1idRo8JlB7HaQarNTEbC7W8AnTW2Bt9nZrtxcGc+EeVCnxBgpcJDOJtTDZAwXALLXLEUpWRBmAHAFd8zXWu6w5Zu7gpNu6UFLu6qnPu6g/oe6uFCe6LRNa7lla3RUpmsqBeRsqYNU8aItV66otXBzfXYJDV3dkj8xBe727DKJr3Uwpb3X+UHHPZpH3ce70hC+7g3Y2ai1eG6HdZG73HVMsAiPqAXCM4BaiLcA3IE6hGuLMJx

NHDgfcok5bbRFARiCkAETsVBa8dRdM3W/RooPzh+OLlFI2q/CzBX0gI2iCjs9dYKr7dy6G3QJ7VHc27+rYK777VM7ZtSNbMZc0UAbmjz6Un27sojDBaMcMLUVhzhXjRDwnZOhF1XfQynHXO7WPfsBdXUrkgRfzaSBfBbfWHxALYHBhV6PO6IGNaLeUIPhcMAkAHsE3h0UblAgsXyQSHeSjUnVMsnIHZBCADABMAHvg69vhjMXSJds6HGgLeCzhd6

FVbEQMGg+EIkAkbajlDriHiliDmt8oGNwFURG02XT28a3Zy6hnfW6wDbik+XQTaW3RM623ZJ6o7dJ6tRYtqRxdw6P7cXiENkflotsTKTQC8agHQfRykJlB83Qp9p3XabZ3Sc7ObYZ6l3Zc6KIkzKYznGagzWa6JvTWapvf+rAOZFTvERBrQtd+6O+TxYgkSlK9lcWb0pTw4ZvYGahrOgAUParysNRrycNaIaOzc7qJAKIA9gNm8QKFK7GTZRrtmO

1h7VphF/uLGkhiF19wikiBQUM8t9gMpc46JBceOAMRwGdx6bzo2L2rQHba3X7zBPUV6s0k26b7WJ7W3UK7NTR27NRZpbavRpr6Mop7eEA/YkoG/ZPKOsiFCliRH+Bbw2bZtatXdtadXSN71db2lDXWwAnNGWaYzfB7VAI4CvJKgAVxPB7hxOVYAXAOYdgB2IKWespnAMVTgTIf15dLforAAooIgCuJOoPJUtFLTIuQMoALREldh8elA2DGC4J/Fw

oSbFRQq+T+qDkAz6gnG14AzSz6llJTJ2fUboAzVz7CtDdI+feQBUOar70GiL7gSuL7PKeEAFANL6LQLL6zANuIFfUr7MtGJShfTB6+Fpr7unNr7G+VFKnXXzy2+at7wtfmb/3YWbAPX3ydvTA1BAPr6qzbGbvTcb7Humb7QbBb6PIdb7+fXb6hfQ76srKL7BxAXoJfcEApfeeIZfU40vfRQAffRwBlfT21VfYH6NfZe6MXA2bjvWlrTvRlrUnRd6

KHRAAzSPqBlQJel6TYm6RLveskgNG5IoNixHChva9wqpdXYuhFR8mJaC3V0hmvu/DvWDDBMvfS7dMX072XZD78vXW6YfUqbcMsq9EfeV7kfdo6NRRjKavXzqNNfPaGvfcLMYD6L40JJaLHaZb/LiejypGLgmXQcijMQrqZ3cc6Kfac7hvQAxRvdSImZTb6BfelBjNGWbBoM1TBhjhoKOtlVQxHYohfQv5hALtZk5qDYMFHnASlH2IYzhgoZqVEAb

9PAGVFIM4AeqDYOuThot3X4g8zAv47FPAHIzWn74PTc0w5b1zOJFU1LyP4A5HKgGeru15FFIH6bmoMZGzjgH4PQOJkPUSzvDNAHC/XAHPTSooausgH6hvwH0A9f1w9FgHHuhz68AwQGGzildiA0/jSA4IGNRBQHrAM1DdjDQHqNHQHcAAwHa+UwGIzRWamfQGb2A+SVOA7WUeAxmA+AxgocrmWbhAxTpRAyldNRjn7vTZIGMxTzyllQxClvSFr/P

mFqOIet7Red3zUpYn6/XTA1ZA7i5p/OQHFFEoHqNCgHvAzooMA7XzNA0EHNffgGnlIQH9A6GISA9EBjAwgHKA0qBqA4rLaA1e76AxaJGAzopmA44HDfd6aXA3No3A9wG6QLwGtHKoGkrr4GwXCIGArGIG2WsEGxFPQApA8rzadqh6TvdPze/VUb+/ZSb0ABsA4AGsBd2CqBbgHtFmAHMBleECclYEIAG1TOatDVbFDqKbylkaXj6QqGkdVm/Z4gE

HI8Hd9gMcYtskQJGxecXx7gDeAbhnZ1b4ffy6L/WniKvcK7Ufbf70fff7tLZzkjHUnbtrs7Iz8gT6XLQtb8DUR8B1N96yfXp7BvS47F3eAGLnTT6DrQg7K7W+xw0JTx4QO3AzYsfk/2J6wTPsBwmwCVtwOLvhMEHXt4ndiK4reraErWxcPrZd60jVUBbcYMBagLcBaiHsA44KE6KAKYBVVqpAKAE+b2BKfyiQpehTeZUgxuG7zZuFya7sU/gU0J/

YqLimgHeH6RBQheBnnWxiqdYTiadTl6jkXl7G3aur5Lb8GSvZ2KyvcCGr/XurSbXebybd27tLQbjbhS+bjHTCQ4QDORt3rNjUNts6iEHqGLwG7wbLSuLevlOwQIDOwbMmkFTUF0AugJIAVgC4A3cvqAZwE5A1gEQAegDOBbwAkJNDf9A+hGewL2A6cF3UZ7YHXzaNdV47EHbe859U5iFWBBoBUAEQ9EDBhxPgZsYnZrAyqDLqgGF578RT57krbGH

4w4mHkwxsBUw+mHMw9mGjIn59b+Cex1wu/x9qBBoOkjJ9YyBva3KIl9jqBOpjgNnRpjRyclYBwkCoNUI9stpdEvtdQMIsS6jgKycpLf07D/XHiuXZaHL7daGAQ6V6gQ+4aHQ+Xr1LWj6u3RK7MRb4LWBOBAZQyaAVnTTaFnDrA2GD6FttZtqXDtcIeVu/7R2A4787SvkQA0N6cQ3q7ARW5bREtc79BLc7DBJ86HnZhGoIMMRtw1ZFthPuGv6VBBz

mMeGacIiBqHIibpEOWEsqGiaUTdwBAhBkA2EDOleQyfEBQ0KGRQ9RwxQ/QAJQ1KGEhDHBAFKkIT3QJGFQFkJiADkJAIHNFoIPU6H7GxRt9qGhePaCaRtodQThBpdH+CWFbQpRE2IBC7cTQyR8TTiawXfmG7+ICABhCewewuSaIPuIbMGBWinUEYA9gDZBTUPoBagKob8AP0A4cEYAg8p5kqPRdQZXLuhdYCwLrLbfzu4N174gKhB2YFXIfbYKaY0

BOqbzrxbvg+aHhPRfaeXUlHRnY+H1HfJqJPaCG3w+CGPwxj7tLW0Um2PpbAI4Z7qhHrBzwx/6CDZmsAUBIJw5HnbVxZiGEI9iHSw3iGATUkbCQ55a28JEQkcWSxpUNyADELjkqeIq4jYD4QVYLvgp4gQdWQN2HNbb2HPrQIK6QHnYLUHHBTUAstBgMRAKAGsAZwM0B9AD0B9olR65+EkAJcGTFJchVGIAF3Bd0E8B6PfuEkivsIHeJgVCPnTQzaD

ZFy3YmcngItx1to0grIn/aw4tJarw0lHlHSM7jtgj6Mo+zrtOJV6RXdHbRrVjLaMmjzC2u0Vio8Y7KEG7FyoyhsrHaEKd6LDjo3DfDevYc6gA+T7fjbFQSw9T73HRAGpUh1H4LfQL5WBUgK9gUaPcBrjuQDusVYECcPtXgBBIvohdgNNHOQwPa5o/LATgHvh6AE6hBANvgLUOSA84PgBBgM0AZhHG79o/ctkQI8A5Iz0UWnWdHlgMYhvgEG1CwsB

HDgEFHWnVzhM6M0xm5DcsiUGHIF1DoLeMoElc3Yo7/g7eGUo/eGRPcDHHdtAbwBccLr/ejLV0RCHsZWziEVtj7jTb7F3DqzBUVpYbAwyO6CPjFtPjX17HHQXasQ/O6qfbiGSY/iGpsuTHjCjXhGKEKg4QIqQ+js8AVYPlxwQJbAzYqlxv9Y1RkMLMlM45zGI3d4VkrcBY6gPQBngKqAPEs8BlAJpBKGG5BbgGwAOgP/kZY9Nw96DmtEMMfb4o8FG

uRZy9n+LCRpiOjbBTfvQw5LnaEo2faerdbGhPbbGz/cninw+qaXBS7HlNYgbY7a6GgTnGtvw417eRdasBYshEzLTpjeAEjiPbZPwMQ5HGmo9HGwA8hHoLeWH2o5WGiQ9HBcLbWASqI3hAsayAQw+NtB8HuiKkDdRpSG3horaFiEnZwKkncRby4zzH0APqBTUGwA44PDgqQPQA98JoBNIILH2IJpBTuU9hkgMtq/wxcGfkqyF2tXIxqhPUxVhUMRQ

HRBlGnfmE3Yl9FoI28t6MReGD/SqilHUHbz7WlHbQ0vGnY1o7HQzo7nQ7M6JXTBsn/WtqGoF3g7OBzQ/Q0iRieUA6rwOCBikPswL4/BGCY9q6b48Z7UI6Z64LUnHe0RAwTgF4RLPXXEAwBrB9QwQdDgDYbcMJtqSDkcxS4xh6IE9yHgwDAAoAPUB9ImmLmgHDhGgKPk44CAV+MApsFBb6l++KpchLXuH6bVptu4I2AH9TOq/YqvRX4V3hN9rFHh0

esL6E7l7p4xaHko3PHivQ+G2EyDG77WDHso06HO3S6GJXX5sYQzK7EYMnRXqAGHKo8ZgFCuUI0Dt8LgLfjHIHYTGY47fHebW6b09o/HPLWRh1MhxEIiBbxl9VhgahP5j1kdjkCoKE5uQNysNDViLYrcB8WLuvr8XiDrkreiBoYDOBVIJgA9RRi6npRHlKCqashQladWEmvto0DDAJGFEVqCiq6ojdFH/gLdzuNSD65HWDdTQ81i1jdD7Z47D6cMq

wnWdewmjhZwnXw9kn3w7kn8o0CcujQInt0Qs5jwzP7h3ZOKPg68bkoEYnZ1aUmYI+HG4I4WsFE5T6lE6TGlZHT6PFLspjA+LSsFUwTcrhqJ9aD/J2enXyvRCNJYetYGWlPr4tuhaIAzW7KcU60r9fOg17pvmIWvPviuFAGaPulwozWYEG+ZBwBZ9DynjA3gBQxHIo6+RxIqA69YllGgpGA0lczXRWb0QCooyzZinIJVNUYztfl8U4VoiAESmhFE+

JSU8P0KUzkBvTdSmYzrSmpmvSmwyYymZSSynvTWyn7GZymT6tyneU2Wb+UwR0hU3KZ6g6Km2ROKm7A5Kn5vc3yI/Vmav3W66f3dipPXalSAPb3zkNSWbk/d6aZUxxNFFPKmpZUqm8U/OzCUw/oNUxB7FRDOIyU1M0dU1SmTFTSnNJHSm0qgymZ/D1TFFIBALU+iB2U3JzrU25VbU7Po+U9YBHU9kZnU7sY2UxUd0HhKnDvehrjpalqRrmdKVg5h7

LMZJAplsusVlv+AugB/tVk0yaJ/Y4VJhcEluimybNrtGg24G/S+iL2qjLQDLRcMhAhGJlBFjaD6BkJW6fo5eHGE8urcvkzrUo0DHAQ+knxPZkmUfTlG3Y3lHIQ0Cc/dv8miGSChOYlganhchE0YzW1fuTfZQIwAHYIw1HL4winQA0hHl3Qa7YgTfpcbIVth7LwocrkvCjHHs5djOAomFJ+J0YPWnBU0QBKQKlczXcAYoMy5JEFAIH4M41poeqDZk

M+gp0pGhmBU96bMM4oo0NeEHw/Tzyogy67INbEGkqfEH4NSGmkNQyRMqZJZYjHhm8AARm4M1LIEMyRm2FChmKMw6mMM4QAsM3Rm6kQWrNud37lg2XG9uVh7krexA9gLUB8AMnBkxZIAZwF9iegBsBkdcwBfAEIBswwSETI5cGBcK9LG8IG56TqqGDhHs6p1L9yXIodcYCHClj7VBlE0NEnN1JQU9mARgmoEqRbzljarw5JrCvaf7nk5AaHY24bl4

5M6sk9wmck7wmfk5OEF6Es7ypABHjHcHg7Piq70+dpjv/etrc6IK9qk+A7NXcBnEIy1G4421GrndGEMIxMA7ndhGITY87SgPYI3M0ct1ri0g1rXhGE6KAIokoedAs8WFEwj86sTQxH6I4C70WMC7uhHpGkqAZHQXc+QOwsJAuwuZHREpZHKUesGIAMRBnABkhngOxA1gPlpVIPRai4AQAQCpKAb9TMjF7bEUPovEBZDkG4z8kqihiD0R/SIu6sYJ

sBwI7ua+1A66E6CMRkzmsKTQ5bHA7Ux8Z4wvGJtZemkfVlGb058nco98mH0wkAbDt7Hu2IEKTzgq7Ko2a8Kk/QVOvihplxQ68Ss3UnFE6Bmyw80nfjsEcn45UBkQKiKQgKtlBUIbBaChql68LbBntbbAlYEMdpsZyhXMhYm2zVYmB/c0ARzefEns03g84BwBjWOZAKAKahVIJoAwg+cHZ9uuFosol89qJplUvkuouTUhgVrp9HHZAGBKXUQh5rTA

lBOL9nz7QDGrY4DnC9VFm1TRwmNTavHtTVDHZPfq80eWLnnzYnySo4cx24HY716PJ9kQ9Y6YUEjbLmFO7cY/17gA6Vnmo8TGB0269PHQLaic/LBf2DmBUuPXhAGGrAAMc9qwOD3g6VkqR/CPAIVUuijWcyk6qjVMtMAPak44DABnAIMBmAGvzNAJ7lHtNnA+QDAAVk+LmCMUSEAUEIdPsPud21aua5uPtRdMM7FsDcatf9YGwEMs7xROKecp4xy7

Ek7rng7een0o4bmNHXgkSbfFmvk4lmoc7yjn0xOKYSOEKbIk7mXhaExkoJxxZ1dBGMcz8Ksc4kxiww0mfonfH8czhcK7Z5blwAYhsMFPqQKNDA+IHog1th3gtYOsB8MEVRbEG1IcYGrQ08zMmuQ+AB8IIwsXPIxGigNABM5gFBjwIVqOQAwBJgv9m48bUxoC17GACzvNrknRpRDEen5Tcf7PEMd0EC5kBdxJAWBPWgW7ul0A6NO4m5TpWRcCwtB8

C5kAkC5emSC0NAyC/oAKC5o7AVlQWcgDQW2gDNrGCxgWdo2+G2CzQWX9KsqYpVwWCC5FL6IQsB+C5kA58KxnJ8OgWaC3QYdIxNmjI+YQRC/oAKDMBZZC7NmLMxIW8C3RoQXbX052MwgwC/AXuC1AgWC7aB5C4yJHvGsxdqPEAdmCK9Z0jG4yHEZk23PRlwoAQiVNqwkeczSFhCzwyDAP/mBsLPUcQFxqocAoWWC0VHxYPvAwC3yASABEHhC+EW70

guBueCiRQECQB0/BQYXfYSIEizllI4GPto9HOxlAFyBrNNnwnNPkWT47QhK6NsBfNNqA2JKmBpQNkXci/liCi4kl5kbiASixsAyiwEX4C3QXq4Ukp0EJ653RDt1/BMApqIO7RUSQpngcEQBueKG7IADJJhi+QJoxKU6TpSWAMmZSBSAJfcpi4kJpQIsXki0MWSJQEW7ACEM87O7QX0oAoNi/Spj6JwRXlIwA8PLSBvC5XmwgEB0npETsDHAYBtCy

Z7ukgVVdpncXukg5IOIGcXwHrUYK1UaQELUvTggABYAkG5BsgF6hKuIahqVkWBz2JWAgAA==
```
%%