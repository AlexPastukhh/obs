---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data
## Text Elements

Service        Name        Username        Password        Hostname        Port        Security
SMTP        Kelton Ledner        kelton.ledner@ethereal.email        6TyYQdNqaXvArH1MNB        smtp.ethereal.email        587        STARTTLS
IMAP        Kelton Ledner        kelton.ledner@ethereal.email        6TyYQdNqaXvArH1MNB        imap.ethereal.email        993        TLS
POP3        Kelton Ledner        kelton.ledner@ethereal.email        6TyYQdNqaXvArH1MNB        pop3.ethereal.email        995        TLS
 ^1ONwcnt8

public class EmailService : IEmailService
{
    private readonly ILogger<EmailService> _logger;
    public EmailService(ILogger<EmailService> logger)
    {
        _logger = logger;
    }
    public async Task<UnitResult<Error>> SendEmailAsync(
        Email toEmail,
        string subject,
        string message,
        CancellationToken cancel = default)
      {
        

        var client = new SmtpClient(toEmail.Value, 587)
        {
            EnableSsl = true,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(
                "kelton.ledner@ethereal.email",
                "6TyYQdNqaXvArH1MNB")

        };


        var mailMsg = new MailMessage(
        from: "kelton.ledner@ethereal.email",
        to: toEmail.Value,
        subject: subject,
        body: message);

        try
        {
            await client.SendMailAsync(mailMsg, cancel);
        }
        catch(SmtpFailedRecipientException ex)
        {
            SmtpStatusCode status = ex.StatusCode;
            if (status == SmtpStatusCode.MailboxUnavailable)
            {

                var error =Errors.Infrastructure.EmailAddressDoesntExistOrUnavailabe();
                _logger.LogWarning(ex,error.Message);
                return error;
            }
            else
            {
                var error = Errors.General.InternalServerError("Email {email} wasn't send");
                _logger.LogError(ex, error.Message, mailMsg);
                return error;
            }
        }
        catch (Exception ex)
        {
            var error = Errors.General.InternalServerError("Email {email} wasn't send");
            _logger.LogError(ex, error.Message, mailMsg);
            return error;
        }

        return UnitResult.Success<Error>();

    }
} ^CT3W8OWY

Email messages ^8ol1Dfrl

 public static class EmailHelpers
 {
     public static string ChangePasswordMessage(string changePwdLink)=>
         $"To reset password click on <a href=\"{changePwdLink}\">link</a>";

     public static string ActivateAccountMessage(string activateAccLink) =>
         $"To activate your account click on <a href=\"{activateAccLink}\">link</a>";
 } ^EPqQHcXf

kelton.ledner@ethereal.email ^iB4KWkcK

6TyYQdNqaXvArH1MNB ^mGMoCMWm

## Embedded Files
bf0db8d776aee8e5890aea3ebf29efa48851e9e8: [[image_1474.png]]

9d620bcd44dcdc2eeaf6882228cf0a3b8b5ec906: [[image_1582.png]]

682412f9f60879a913815d299db5e9e26afda036: [[image_1583.png]]

d07c978cfd6cac56f86c3ae4df6cc6bd2f1e70e8: [[image_1584.png]]

54d385659c8d7625a4759a31df08783b0052bfc3: [[image_1585.png]]

9a3b049e2c364a5ce81938919d0a5a5a1ff031f5: [[image_1630.png]]

%%
## Drawing
```compressed-json
N4KAkARALgngDgUwgLgAQQQDwMYEMA2AlgCYBOuA7hADTgQBuCpAzoQPYB2KqATLZMzYBXUtiRoIACyhQ4zZAHoFAc0JRJQgEYA6bGwC2CgF7N6hbEcK4OCtptbErHALRY8RMpWdx8Q1TdIEfARcZgRmBShcZQUebQBWbR4aOiCEfQQOKGZuAG1wMFAwYuh4cXRCfWikfhLGFnYuNABGAHZayHrWTgA5TjFuZoA2ABYeZvjxgE4RjohCDmIsbghc

AAYU4shCZgARNKgEYm4AMwIwuZIVgDFmAA5iPDXsHtJMVoBmOGIAeQArP6tAAqAEdNiUToR8PgAMqwYIrQQecECKCkNgAawQAHUSOpuHwCqj0Vi4TAERIkVc5ui/JIOOEci05mw4LhsGoYIM1ms5tZlBTULyiRBMNxnEN4s1tJ8pTwhjwPs0RlLZiKuWhnM0pmttGs5cNmjx4iM7nceHc5sw0ZiEABhNj4NikFZo6zMNmBLIoiCadkY5S0xYOp0u

iRujge3BeqA+ih4ySDD5DO56s36tZKkYjSVqrZSBCEZTSAnZq0II6DKZDD6tE11vMlQPCOAASWITNQuQAunMTuQMu3uBwhNCacJFgzmJ2R2ORZoJ8QAKLBDJZTs9uZCb64Q7HFqfNZ3Zp3I/KtaNyBEDgY4ej/BzJ3YLH71BnfAXEXW3dCTsQRCLAsyg+pCwRDhImgnGsxCaA8rStEMuAVncCDxHcOpIbgHwIJBPBTAgZymncUoIPhdw+sw7jlPk

WxgM0HR0US3YFAAvrURQlLAiCulgsZzF0jTcEMQz8Uw3QcH0HADGgdyfDqIwXpcizLBIWE+js+zBHupznAglyvhAzQ/D0FDYFk5F9lCsLwuUEBUscVo2liuLEPiaCEvm1okggZKCnZjrUiKtLFlOnb0SKrLspy3LCvm/KCrFJRipqrQ6gkKZyWhaxTOM8RzBqvCTNoEzxDWKa1q0zSZo53khs6KwAMTNAgzXNT6frPs2QjBo69XhuQkaepkfEivG

rmJi0Hw5Uk8RTJMyp3CMtZ5SKkiFsWsYtPEiUCBWr5tPqprGgqcxdW2HZ5L2Ir9rgg6vrOD5BYuoV3nO+YLt1y6rsNG5Xfm27ELulYHkqMzxGhUynlMj4LLeaAPY+bDPsDb66X2nBQDChBGOUPA7RAJwY9ct1QgVK35ocmCbegAA6HAwkwZhiKgLOsyzPS3QgbNswAqmEpAcJz3OswACqEzAUM6xDCyzAASbDWoLGQy6gIvOlAKsM9gIicnTMIAL

JAiLKsANJBFAnCoAAMkcDKkCrWL4BbHDaMExB2wAAgg6hMCE+DaOkuBQirQxAjAACaACKxA9CCuAABr0AAgqQsvNPrPQAEIq8w+iyAHPuBAQAdVMHMtoa0mtAknABKQJAlbMJ062+tJ8bMtm07ls2+7TAO+bnCu7bTBe4Xfsl0H+Ah2HUcx3Hicp2nGfZzLlS4HABdrUX/uB2XwtTFMHwqw3TccCLPwi0fHcDxw1vD/bMuO87Q+96Qo9b+Pu9TzL

ocR9HscJ2TqndOWcVZwFZB8Tevti5fxVgfeIx9G50x9OQCgQJeIrD1ozcwXMZYc2VjLPmTAla4OFmLacktSDSxlvLRWQsZZq1IBrGWWsdawD1obduwtO7Ozvq/fuXcXZu09t7D+MDS7f2Fr/WeACF7AOXjnPOG9RHQJ3hIlWFcq613rkgjgLc26mxvnwu2Ajn7CJHio7eE897c2kf/eeQCl6gNXlUZRY9xGTzgYfRBp9z6X0MYI4xfdH43xfiI9x

ajPE/xnvYwBi8QEr2FuAuAkDLGf3UTLeBPjkFzEplAJORBlBNHQMEE4I18z1CgOYAgBSizFOgKyH0egshBztuBVACMIqkCLAsAg6CqaYPptg5meD6HCyIQLMZ3NyESylirWhUASEq0Ycw4WrDunsPppwgJvCe4mJCYIsJFiInWMkbYmJc84nyOccLXO+c0keJsWzTRLDq51xPs3VuXDuY8O7vfUxg9zFvweZEp5rM7GXLkU4xJ3M15uLEaCs5bMD

5X2Fh8s+F9UU/KMXs4Jwsn6Avvu/VRpzp5/0hY4hJYCIFQKsbAzJc1slcD5EIC2NdwjY3KGiIQekRTXgQLLdaJYWgzVYuxEUXFbJr2UDUEUAlODcGIqJBovR+jlGaMqY0s1TyXnmMpZK6BcBDHUnsA4KN3yfnzFcCQ+A7jYjuLgGumgfjEAxD0EW+ARYUFwM0QgMBiDhxAlZXytl7IUScjiBMBIaq2hDYiAKDknp0hesyCKbIOSwBinyDgApyj4w

NRKIYrQEjmizB8D48R4LwXylWVoqY0Iqm1BWj4F4xgxqxHVMM6AIxRhjO1f0XUeqhldANXtw04xRrQK0HgHkShrSLMK1AExwqeT2twcGHxZJrGnbqs67Zfp9gHAgdpnT8xBl7tOV6j13qLhXOkH6l0tw7m0iDDVPJUpDB1JaPlsMr2I2Rq+C1vLPJRCgL+FYAFHA5qDWBAyUxiAKjWJobAxBsyPEeDwCsuATgpnNDOu42AoJYVgpoeICBsA6mNVa

KieQiR0QYs0JiYqCgcUgJKlY0rZUVLEoJNAIwV11B46qqS6rzQjFSmhZMSklgGtWBZEUGkzWAbRgpgySNlDYijmRtYGIJQAClZay0zswIYpAYC3kstCONlIE3hu8i5NyvB20+RsvG5E45k2MkGCydN0UWg8mzbm7g+bxTCSGNoJaYMeCyn1OMGtU7MzaElFDeClbYvOc7SO90Q1vRzA6gGc9mX+rZejOOuYY1HPHimNoRaOVWjiYUlVuY86NrcGT

NVlULaZhHTGNqcsKMjQtrrEeSYp1aTnQPddI9J77wecnF5+Gs35y3u+uuR9IoAZA32p8N927qxfphjeP9fKkYvh0h+YDJRvxgb/JBoCMHj0GRTDwfjPAThTBw0eVKuApjNE3RMYgeF4OkdIggeU2HAaZio1+GjaAaJbAE8URjWxmLFDYixiVZQONVBlT6eVxTKrKvEpJaSqAxiHymtWXVCwZMrB+yazS3tzUqatQZAA+kCSQIJ9DMBgLseIJxdiQ

0wMoGAUwTNCCEDB6y5JQ22ecw5iaTmvwRus+gMNHmQoLaXT5qKmb/P43inmuYBbRjSmNEaNoFbD4KVnZAAqVVIYyg3dqU8NZUrtBV7VXqXboCjpy+Uko+XB3ECK92/3pXcujUnagIYbQ9SHzrKVKaGrq2rSFdTdrEX4hdezGJ6Y/XXzphzB8RUIkRR7ounDv6EJpv3SW2e562vT1B5W/etb1en2AxfUunbVU9ufqPIduGHSG8lCfGdtAQHHI/lu5

kKDwFLOPZWMQbdFG62EYQ3gbApUTh3CGNgD4SERjEBw9gbAQxNCA5OM1VoawEDyc8rDrsdHEeMRR8x4orHSjcQkJxvHQmxS4mROjQJO5Qh8ZoyoB2Cm+qdOScDOSm52lqJQ1q6uFAAAajCMoNcNiGsEYGwHpvgPEMwLgNcFCEnK0GwNLmrv5O5l7raIrtGvQaSK5jZnQY3p5peqmvmJFBmg7gFiKEbsFibqFp8DKHHiqPBGaLbojhAA7iaNVsmCe

C9pmMqH9t+iBt7sOsVoNJHoHpAMHoVj7llroX2uVjHslsVIPnHkWvxheJ7vmC1oulnp1tlHni9gXl+GujJGsMaNIXjGNi2PuutvmDdHdMdhwfNlwaPm9K3p9HemuNkCESUJtj3lbrth+tAfmNeCPi3leKdszhdjPjdhBvPvdkvu0hACaMQJuqVLNNgHBAqPELgOJrNFhM0Kfl9ncB8JoDyJMJBIfhRM/vDkjgxkxmjuKhTFjuGBgiAQqnxnMRJGq

oMGhLNJmHhHbnqrTqpJnAgVpIUcgdsAZHaECB8Paj8JptQawervLswZGuNEwZobGtcbQYFBwVrtEbIbwX5kugIXFDmglCIWgCaOFm0ItMRLUdmCMNDOqIqiqBFlVO7otBqlThlsYRIE1C1Fif2p1EYdoeHiVmYdHg8WgJDHENFjMCeGDEqMaM1hnoMEMH8Vdt4Uug1vBPhruuNsEZ3lNpzDNrEZAOeimjEdenEYsAkQ+jyf9M+gNn3jyKeN0fVsP

hEePgUcpkUddBjFjDjASPjITFkMTPoKTOurkhghIHAFoEQNgKgNgPgOLKgEuBIgzKQEzFzGgK2I6ZPM6a6XTMAHTGzHAN0vQEDKgEXMQJwPgDAKgK2FbGwMoDKqQAADyelQjek4IAB8qAbOTo8ZTAAA3P6azBaZoFaQ6U6cMggAABQxlxkJnJnlkukZmoA5kJkACUhZLMfpt8Ms2ZtZfcAAvM2X2aQAWd2SzCxB2agMWaWaEDAFJKgECKEBiImTz

BwGoOyswKOFAMmaQOiKQOmZmQzOKRIknLzlJJWZOWzCmVPBbNedQJeazF5EBKgJuZoH8ORlAPeWOdzE+TmqgBkNONUF+SrHaNYGINCLuI0ECLaLfHgCJlPIOUsGcFue2d+Z2Q+SzHTBhagMGfbLaYQMNKgIOQyBQKgDCEonaEQMNJWbeRItoOgQQDytQKgBXKhSrF2SrFeYLCWT5MwAhagNynpNhbzGEPsMhU7HaIEEsFkFYB+ERajEUcJazJJUc

MNLJcwPJSRagD0N7JQhiCpdJVUgQBeWhZxZhRAASkIkSiCqcjTDQEpcLHZRCrIpSsvHZahdhSxKOVhaZSzLhf+ZPPrMwMoJpQgKRfrIFYyNUCZSrP2AYGgHZZZUcsCicl/HZcBTLBbGgLRZPPRYxUJb5S+VoO+dgFAGgK+SVZ+dhQuMQDAGgABSQTKq2d5YVWiDANhRxWZagJQEHBrPhcNNoEecQBFeQWedgJWRIkFcoMxXBeBc1Z5dhXgFANgJI

JWeRbIMTFCEcOyhyHAARVkEuDgAgHAFUpbFgGxTLJ1WZetXAHCLPg6EsC+aBr+PJVgINc9cwA9QgKOV1agIQCcKgJWddi9f2YOTdXdTdl9doCNfgAuJgKubgMGVCLgDxRdWZV2Q5dzP5UwHuURUuLuc6MwNoK2BwDdF5EIKVSIAgNoNeUnMQGQIyLsGwOEAdZgDsFAD8KQAjUjXaZoFWfNYVSrL2bmaQNoLGRptGGuTmpWVgNQDjc6NDVFU1T9b9

azIEGBgLKgPLSOZjROYLazEEGEJjVdardjQTfbIOfjXuUTQAOKZBMDFwk2HCTKwiMxMBW3OgXkQDXmoDABfwsSoDerMAcAADkGsYQiw7lKtqtWZLZTAYtcZHtpAMtmAzF2titgFMqzFk1wVAtMdLM6tIgt82t0dnFetKs5dMsS1K1gNh1YgJ1jQWtmAaN3MJtKsZtuNlt5ttt9t5A/sTtxCBA3p7t5tXtPtftEiAdQdod4d8+UdmNwtCZCdygSdK

dad5tGdjVekAVUIU1edXVhdmtJdC1HA2Fh9t8q5654QW5g1FNYg04O5e56ZlZAtk5etLEKClA/S1M/4lp5gNpdp04ZZXpFZqA7p15aZYgvpk5gZhAwZhwoZIQ4ZHAkZ0Z4tdZEDFZmZi9+ZMDf91pmDjZYg1Z6DTA9ZIDRDCAmZcdpALdbdrMODFtQ5ItpdldLM05/9s585i5zAy5l9UAG5W5j9zoB5ZF8+tNY1MVMsPtOVUIGVtyaIz5FVH58jP

5ijf5DVQF2FoF8Fdpp1HA0FWIsFYFQQ8lSFuAKFD59DmFp9hV/l/VWQoVpFN1lF+1UANFbA15eVvg29rFHVmNS43FwQMIfF8lglqjKsRCYlFjElUlal5w8l0+mNBl8TclxFYV2lulzo+lcTMlxlmNbMiVoSQKxKdKEi6VBTrMTlFyLl8SblEAHlhVXlPl2F/lOdIV6T4VkVmdVZ2FcV+gCVFlxT1lqV5T9lrVbA2VnjdFDFPjETj5xVH55VizpV8

zLMNVdV/5StCAr9rVZm/j+tLMPVagADbjg18+MNp5c5417TM1Jj+A+9wsbD3M1dq1N1m1bsO1hAe1w0ddx1+jTdLdbM1j3M4NH1X1T1s+r1mA7191bASwpdKs/1gNwNGloNZFSiENv4UNMNcN3Nk8KNwQQLl1Pl+dOF0YWt5teN3dxNpN5A5NlNgQNNJ59NgQ04TNLNUAh17NnN+LyNfNL9iLXVjDy92IktQEa96d+s2zjzqt59lLe5QrTzmNhtC

AxtlTflFL2t8lSdPddsjtWQg9rtLpI9e5Y96iE9k8U9oQM9L5c9DTSrnFIr4tq9stCrCt0rPT2dgVudjrKs8rx9hzqAzzbMIbrMrztdR1DdZ1zdBzv1HdzoOrNLdt+r/dhrLtw9pAq9dl49/tgdNrYddrkdDrC9NDy9rrqd7rotnrW93ru9vrmNAb5tjretZ93sRdqA/DgjTst95+jIwj+5grpLrM79PoeStSRSKwpS+hDATAVS7gE79SFscATSG

MrSTA/JopkAzoPSgs+A39EG+DAD9phDrpYD0Zp7OC0D35sD8DXMYZEZUZNZIt5DqZWDsdw5pdHDBDDZrpJDw5r7xrrp1Dw5dD2FjD8lNDrDeDJZnDY1C5S5K5a5Aj19TsA7ojQ1Ej1zUjwsMj0zk8azT13Sf5yjqz2Fv5IVmjWd2j9zejUFMFNp9zZjBEMTUAxLILw7ws9jVFjjnTGLsgrj1Fsj/sszTFLFskxL6FQbgThLvF/F4TmNUTLHW5KTe

TaTClFwyTuTRl6nWlOlUAelqnOnOHqtRThyJTNlaV4zZL1T5KtT1ymc7lnH3MzTtjrTFL7TTjqAMNNb0VfT6IAzqAZnZiIzCKtl1nmVkzAl+HUI3jTF5HKzZVRVb5Kj1V8LmzVHOzLVKsbVcbXVxzfVPHUA5ziwlzkjtzjH8Fsrobi1u4K1a1SiHz215G3zbjfz0bxdsbhVILbMYLcLj1qL0LsLkN8L31mNyLQNH1RFYNmL4Lo30Nk8eLgsPNsnk

nrdzn8bWrVL/ZurtLZN3KjL1NtNrLjNzNwdXLbN1ovLy3BLAr1XwrZb4tYrAsErstUrMrfrMsTbirutKrF26rQbbMCbTDu3KbDtabzte7mb2b3tFreb09hbEdxA89gPDDj3ido9br73XrO9+Ae9n3ws33zoBPwbJ9KsEblZ7XAL51eXZlwPSb1t2gYPfdtLkPQ9btWbo9ObcPk9+bwdiP9r93wszrGPZrWPG9vnWduP+Pjb7bR9zbJ9bbGtF9yH3

bxXMId9/bSdz9uzNXHAH9LKbKHKOp2VpATFP6DIgqC61M5u8Qn+hQmOv+JSCwXGgmKqxSFaixYB3IOoR4YwGhKBsBqkdoexTO6phx8wBkScMAIwNtygiorKkgssGIMAMIssQwGIawygIsPMVxsubmbxV2EajB7kzmNBGuSaHxYUuufBWaghAJxuIoBa9WxaU0yYEhCkho5e+YBU8oF4EWPIJ45aHwCkda5MRfWhfU6AmJrUrvBhA6eJU/fuhJZWx

Jjm6hxaGYx4La4wawn63fc69J/mSQGqeeI/CklJUoheBI5a20+oowgR243JXYNekAYRy+i2ApEAQp2urGbG0xvAIkOjhvTxFVsSRKUikRlLbYaSdaSqNtCkwW9ciY+fIgBiQKXZUQ0YKAJnBpz3ZP+W7DAIsGwGARoMeAx8KECgAOh9ARpGQEcDVgLBqYeROyFECYQpx0QFANaLgHrxf958rAtgOwKQYqlIA4CegRuDowjFigO0CQXRlf5gBxBdE

TdJv22jb9fCiJasAxDABahdQ4wZUKaHP5uFl00g8YmAGAEO8piTvaALMTlSAECQ4/ToIAW95bRJQOeYSItGkwqRDUuwUPj3mnyqYVgdwR0M0F2D9h8AefPyBXyeLOQY8mxLyM8Xz5sFC+gpYQFX28xpo9c/BQ3A32EJN9xQSoaUL4UrTHR6sNYYArCXcjOCksowU0L4W6JzQcwaJfEhABn7Yk8sC/RcGHmX6mFV++YCrErnGDFozQxEC8NUNLzVR

081vNrOFl+zlpsokoadMRCqi6owgA2C8EaDrQ5RH+E2ZIm/zryCDv+TeaIowI+jikwBk2aUt3llIwDZIL2XrMqVIEnZUBU+FnBCC1KcoCQ1WHPHv3EzTo0IFoI8JsX1JQBDSxpYEqaQGQSAfamXHIDSC/pml0AEI7ZlCIlS8RF2U7AiDO0qTVJ8AKI8MI0jmDNIogLvUgJuxZDdJ/AfSWEbD08SQifQFjI3qwBN4CUze6AiAPyit6tYRUxoe3t/n

Yx/4ccc/Wdu70GAB87B7vBwbwGqElRP0mxGnO4NWBLgvBBxZkagQgBGAPgJsGuLLAABaxMDgNcFkj6A/gQwEEDXAoD0BZYNtUIXLnYIT8GCUQsvi8XCElBgo9IbXF8V8z65fiGQoLGgBCwpQ8YNWSqKMFBh1gjQwouQgSFlBJALwNYDVBMG3QOEbRHadEgSU6FR53orQz6O0J7QB4J0JJX4oyTpLjD3I3Ra/geHEz6gzQBYivFySrwv9D0fJLgfg

J/4HDkBvoNvIkVOGQDzh0A1YbJBLzTpbhIpf9JPg07MjUWpRYgYvmuhbVKiUwYjBeHwg8BD8owXAPEDEBVZN0v2eDGsFXG7jmgJwKCEqBODxAhiBAaiK/jGIf4JiGOMwbZDyQAFBR/mL3ssRaAqh8Mf2B/jAW2KGp9YCo8PkqIMhLgRYIISOLLGwDxwTglogvomgiH3FHM0Q1XA6NuLvEXRnxGvj8X7yBZAS2QmSNFhqyyRSo06eUNtD+zxZeAdY

arNFnLRzRiIJoNoPUKX5NC2oLQ3Em0OTEdCx0aYkoD0MVTTRoSc0VPCeDrCFj2R4o/GEsNfDaDhgeEJkpAErydjthDY3Yc2JnCtijhX0dvOALrEbYoBgwHbNFgImfpfsg4xgRPkVHowsg2pXGHqSJgkxIyJpJEWCPQBTkj212f+raRPYSJBU+ARACwH9Jt1v2kLedkR2fJ2hJA/IBADMkoTDVtmk3YjiFRWoRSvUxAK2LDFbL9l0ywlAACR2VoKi

DMIBrDZAUI5k+FZ8KgEtiJlcAqASQIEBOD9kaYDUiAMAESk5pIpFAFKbDAnKNT0yORRMgoFwCZSIA2XAMq5NAz/0KOqAJOKVTgZAwppegbqFAEl5VkJp7IKpHezmmpSbwrZIiplMFo5SIAeU1aTNIQYwBhA9sdkPNMcalSMQ5U2+JVOqm1T6pjU4AEdPWnn5NpGILqXZR6mww+pA0uyj9QN5BQYRTkiAC5Ng7Wk3J1pDyUA2vLeTfJzAfyZeUClQ

yQpf5MKUlPFjRSlpcU58i1JlTJSPp6U3aZxX2l5S2W3sKcljJKlWkbpFUqqTVIIhPS7KzU8Ka1MJmdSGp303qf1MGnDSiyo0yCpDPUYhUppa02aefgnCLTYpK06aW9OwBEydp2U3KWwG6pyyQyp0kQGrMumFdzAdMu6QzMelcympr0iWQrM5ndSeZ/0oaf6SBkUxkRhSepNOwfHzsakjs10LiJFD4j12RIxsSSN3bkjQZ4M0sqjJhkaU4ZQQBGUj

LQooyxpws+KagAxnszqZVCHGRNPxltSOpW0jKcrIOmqyKZhUlOdLGum3TUA90xmXVONmsykp7Uj6V9IgA/Sbwf0vmRt1jlCy0Zos9WYcDmlSy05IstWeLO7nvS0pSsvaSrIHnHSuYms86ZLIWmnMyp9Mh6UzKrmmyh55sm8PXMbnLleZAM22TSNZRsANyrw03ub2yIu82Ri6W3lyMd53jLB3GR8bHmfEiZBgioOsN0TjzSig+hqHoH+LQH6QOMmc

EYCbGxAYhsAJsKCfEJgmJi4JvQ+0XEJuLWjEhnBavqkNr4G4sJjffMAWilCKEFQVUStCMMrQJj7cDJVMBJgmAWgy8ceE0AxN9xMT+RhhNiQ0OzF6Fcx8EotEkCminhKoFoSjLSTGGiT+Fq6FGJVGTD1Z0InJIIrWM3C8lwidwyIhelUlf91JEpDvNpLOFbY9JoMFULNFTy6ociuwsyf+IsmYxj54okxUCPskgjHJP9JKhZ1GaTxP6aCCkXYtC4ko

v4Y7B2XUlRFlIXZmI7Ed2k9n5hvZhI4kV0gDn7sXFwzV+KU3SSOLDeh843lyiZGHYBUR/JdKKmvFf4b5PEAZIsW4C6p8cYo4SL9gkU0Kvxso3AD8F/mPCNSrOFYPoBtr6w2AdofWNiH0AQKEFCQpgfZjtF3Fy+yEp0UkNQkoKeC7o9IRgqyFYLxQf2XUN0TlBFoFo2oYSaUKXTHgksL2KqPvjmiZgcwB/YkLaHaH0KcSBWJhUvxYVEluhUQ/0fxk

hhTDK0vWM0CJMXRCLmSKMPGKeEzDTp9lEAeSVsIJg7D5FQyz6MKUOHtjJS6irsZotfSMlKov2D8SZNbFGK/5mpSyWYoCKorARdksmKCJ/rOUHEdTLOE4oPYSB8VVyaFJ4qpgBKWRaIvxQu3dk4iV2eItdqEr9nhKyRkS0GWSqhQJJ95dIsxeEwt5pKixGSzkWjnAB/RVgcAW6qBnKAcRoAa0DICvmjAWYCgDAAihQEzgZih0jEg8Xqsgm1AIA2sX

csNFbCHB9AcISfnQtn7MS1VxqmMGavSBarWJmY9iRcq6GQB7Vpq81WQSsxITrRRqkQA6vNWWrbReY2dIGpNVZBHVFqxCfAteJQLI1wa9IDXGGXCkBMSa71ekB+DjK6+JQL1dGp9W2SjSVilioaoLVQAY11wF4QyIxX5qg1Wa/QN/WpXOzy1DawtekDuosCCa/AzgSqUzUdr9AgTYgLwN7UGRowbA8EAOsrXmrR1YccweeinWUR0Q0IeONwAQiJAL

QpedCPqE3TRZGwdkbACuvwCBoyhxaHUBWmIiMlGs4wA9fgQMDcBv8wZHxsFgSDZhD4PAe3tOpjWpqQV2uPYZ9CnWBgSAVk3UoauA3EA4Qx1ByU2G6TDVRuMnHisYrVUQaw83+TOI6AMikBlAfoSsn0OYr4beA9EoUAkFbI+h2UygUcNGBWDYbcNioXkLwBbQEamNJG+IGRq/UVrQ1WIHNfoyUWikAVnMdlMpHimPqRQmQWTq+EFXBKiAK7E+cyJI

TcApNJQYQFAH5SKamRX6uwJVWYAwhBYcAZpUsEQ1uwUVJQV6QgGgqOhRNt4xEGkGmkKo8Rv4C2E2oAGmS1SJm8fOQLFlwNzNbASzXgNYjgBgBBMLap2GAAsQQALEIAA=
```
%%