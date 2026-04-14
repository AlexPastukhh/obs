---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data
## Text Elements
Install Serilog ^5D70Py0N

internal static class Log
{
    private static readonly Action<ILogger, string,string,string, Exception?> _invalidActivationCode = LoggerMessage.Define<string,string,string>(
        LogLevel.Error,
        EventIds.UserAccountActionvationCodeIsInvalid,
        "Пользователь {fullName}, {subjectId} " +
        "перешел по ссылке с не валидным кодом: {invalidCode}");

    public static void InvalidActivationCode(this ILogger logger, string fullName,string subjectId,string invalidActivationCode)
    {
        _invalidActivationCode(logger, fullName,subjectId,invalidActivationCode, null);
    }


    private static readonly Action<ILogger, string?, Exception?> _invalidId = LoggerMessage.Define<string?>(
            LogLevel.Error,
            EventIds.InvalidId,
            "Invalid id {Id}");

    public static void InvalidId(this ILogger logger, string? id)
    {
        _invalidId(logger, id, null);
    }

        private static readonly Action<ILogger, string?, Exception?> _invalidBackchannelLoginId = LoggerMessage.Define<string?>(
        LogLevel.Warning,
        EventIds.InvalidBackchannelLoginId,
        "Invalid backchannel login id {Id}");

        public static void InvalidBackchannelLoginId(this ILogger logger, string? id)
        {
                _invalidBackchannelLoginId(logger, id, null);
        }

        private static Action<ILogger, IEnumerable<string>, Exception?> _externalClaims = LoggerMessage.Define<IEnumerable<string>>(
                LogLevel.Debug,
                EventIds.ExternalClaims,
                "External claims: {Claims}");

        public static void ExternalClaims(this ILogger logger, IEnumerable<string> claims) 
        { 
                _externalClaims(logger, claims, null);
        }

        private static Action<ILogger, string, Exception?> _noMatchingBackchannelLoginRequest = LoggerMessage.Define<string>(
                LogLevel.Error,
                EventIds.NoMatchingBackchannelLoginRequest,
                "No backchannel login request matching id: {Id}");

        public static void NoMatchingBackchannelLoginRequest(this ILogger logger, string id) 
        { 
                _noMatchingBackchannelLoginRequest(logger, id, null);
        }

        private static Action<ILogger, string, Exception?> _noConsentMatchingRequest = LoggerMessage.Define<string>(
                LogLevel.Error,
                EventIds.NoConsentMatchingRequest,
                "No consent request matching request: {ReturnUrl}");

        public static void NoConsentMatchingRequest(this ILogger logger, string returnUrl)
        {
                _noConsentMatchingRequest(logger, returnUrl, null);
        }


}

public static class EventIds
{
    //////////////////////////////////////////////////////
    /// Authentication related events
    //////////////////////////////////////////////////////
    private const int AuthenticationEventsStart = 1000;
        
        //User events, start from +3
        public const int UserAccountActivated = AuthenticationEventsStart + 3;
    public const int UserAccountActionvationCodeIsInvalid = AuthenticationEventsStart + 4;


    //////////////////////////////////////////////////////
    /// Token related events
    //////////////////////////////////////////////////////
    private const int TokenEventsStart = 2000;

   

    //////////////////////////////////////////////////////
    /// Error related events
    //////////////////////////////////////////////////////
    private const int ErrorEventsStart = 3000;

  

    //////////////////////////////////////////////////////
    /// Grants related events
    //////////////////////////////////////////////////////
    private const int GrantsEventsStart = 4000;

    

    //////////////////////////////////////////////////////
    /// Device flow related events
    //////////////////////////////////////////////////////
    private const int DeviceFlowEventsStart = 5000;

    

    //////////////////////////////////////////////////////
    /// Backchannel authentication related events
    //////////////////////////////////////////////////////
    private const int BackchannelAuthenticationEventsStart = 6000;

   





    //////////////////////////////////////////////////////
    /// Ui related events
    //////////////////////////////////////////////////////
    
    private const int UIEventsStart = 10000;

    //////////////////////////////
    // Consent
    //////////////////////////////
    private const int ConsentEventsStart = UIEventsStart + 1000;
    public const int InvalidId = ConsentEventsStart + 0;
        public const int NoConsentMatchingRequest = ConsentEventsStart + 1;

        //////////////////////////////
        // External Login
        //////////////////////////////
        private const int ExternalLoginEventsStart = UIEventsStart + 2000;
    public const int ExternalClaims = ExternalLoginEventsStart + 0;

        //////////////////////////////
    // CIBA
        //////////////////////////////
        private const int CibaEventsStart = UIEventsStart + 3000;
        public const int InvalidBackchannelLoginId = CibaEventsStart + 0;
    public const int NoMatchingBackchannelLoginRequest = CibaEventsStart + 1;
 ^vdafl0K7

## Embedded Files
a66b760d49eb57197b3e309d34bc8e6f066badaf: [[image_1577.png]]

b3e1d65ff92ba8e501005b9c6d6e190cf84a1b68: [[image_1578.png]]

c9f2975cdef88f01b6d7fcd0eeb2cf0cfdb17722: [[image_1580.png]]

7c1faa6a216a0b6decf01b3a5fccd0ab65cc7223: [[image_1581.png]]

%%
## Drawing
```compressed-json
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
```
%%