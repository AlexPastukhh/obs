---
excalidraw-plugin: parsed
tags:
  - excalidraw
excalidraw-autoexport: svg
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
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
```
%%