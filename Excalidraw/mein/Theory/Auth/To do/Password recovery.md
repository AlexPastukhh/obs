---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data
## Text Elements
public class SendResetLinkHandler : 
    IRequestHandler<SendResetLinkCommand, UnitResult<Error>>
{
    private readonly IEmailService _email;
    private readonly IDataProtectionProvider _protectionProvider;
    private readonly IHttpContextAccessor _contextAccessor;
    private readonly IVerificationLinkFactory _linkFactory;
    public SendResetLinkHandler(IEmailService email,
        IDataProtectionProvider protector,
        IHttpContextAccessor contextAccessor,
        IVerificationLinkFactory linkFactory)
    {
        _email = email;
        _protectionProvider = protector;
        _contextAccessor = contextAccessor;
        _linkFactory = linkFactory;
    }
    public async Task<UnitResult<Error>> Handle(SendResetLinkCommand request, 
        CancellationToken cancellationToken)
    {
        var emailStr = _contextAccessor.HttpContext!.User.Claims.
                FirstOrDefault(c => c.Type == ClaimTypes.Email)!.Value;

        
        var protector = _protectionProvider.CreateProtector(
            purpose: "Password reset");

        var code = protector.Protect(emailStr);
        var email = Email.Create(emailStr).Value;

        var sendLink = await SendResetLinkAsync(email,code,cancellationToken);
        if (sendLink.IsFailure)
        {
            return sendLink.Error;
        }

        return UnitResult.Success<Error>();

    }

    private async Task<UnitResult<Error>> SendResetLinkAsync(Email email,
        string code,
        CancellationToken cancellation)
    {
        var link = _linkFactory.CreateLink("ResetPassword","Account",code);

        var message = $"To reset password click on <a href=\"{link}\">link</a>";

        var sendEmail =await _email.SendEmailAsync(email,
            "Reset password",
            message,
            cancellation);
        if (sendEmail.IsFailure)
        {
            return sendEmail.Error;
        }

        return UnitResult.Success<Error>();
    }

} ^X05BlykH

## Embedded Files
2484f793be60712d8b6622d7a17590e3cc97f501: [[image_1626.png]]

2bf25d3c144adb788fdcd2971df9e6f1b809b539: [[image_1627.png]]

55d8bc685ca7f893736c46deecd71519ac8fbcb7: [[image_1628.png]]

18da46a6f384adf47fb6fc7edb8f917c376bbccd: [[image_1629.png]]

%%
## Drawing
```compressed-json
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
```
%%