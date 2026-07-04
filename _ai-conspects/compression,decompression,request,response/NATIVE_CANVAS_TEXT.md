# Native SVG canvas text — normalized

The following native canvas text was preserved in addition to the 74 screenshot transcripts:

```text
some problems with implementation
about leaveopen false and ownership, disposal responsibility (important)

using System.IO;
public interface IRequestBodyDecompressor
{
    string EncodingName { get; }
    Stream WrapDecompressionStream(Stream input);
}

using System.IO;
using System.IO.Compression;

public sealed class GzipRequestBodyDecompressor : IRequestBodyDecompressor
{
    public string EncodingName => "gzip";

    public Stream WrapDecompressionStream(Stream input)
    {
        return new GZipStream(
            input,
            CompressionMode.Decompress,
            leaveOpen: true);
    }
}

public sealed class BrotliRequestBodyDecompressor : IRequestBodyDecompressor
{
    public string EncodingName => "br";

    public Stream WrapDecompressionStream(Stream input)
    {
        return new BrotliStream(
            input,
            CompressionMode.Decompress,
            leaveOpen: true);
    }
}

public sealed class DeflateRequestBodyDecompressor : IRequestBodyDecompressor
{
    public string EncodingName => "deflate";

    public Stream WrapDecompressionStream(Stream input)
    {
        return new DeflateStream(
            input,
            CompressionMode.Decompress,
            leaveOpen: true);
    }
}

public interface IRequestBodyDecompressorRegistry
{
    bool TryGet(
        string encoding,
        out IRequestBodyDecompressor decompressor);
}

public sealed class RequestBodyDecompressorRegistry
    : IRequestBodyDecompressorRegistry
{
    private readonly Dictionary<string, IRequestBodyDecompressor> _map;

    public RequestBodyDecompressorRegistry(
        IEnumerable<IRequestBodyDecompressor> decompressors)
    {
        _map = decompressors.ToDictionary(
            d => d.EncodingName,
            d => d,
            StringComparer.OrdinalIgnoreCase);
    }

    public bool TryGet(
        string encoding,
        out IRequestBodyDecompressor decompressor)
    {
        return _map.TryGetValue(encoding, out decompressor!);
    }
}

middleware
theory
automatic decompression on HttpClient
compression with HttpClient and on server
leaveOpen, managing the wrapped stream
compression level
wrapping with compression/decompression stream
decompression
handling multiple encodings (rarely implemented)
when to compress
Accept-Encoding
Vary: Accept-Encoding
just explicitness
true implementation of decompression
do I always need to configure compression provider options
```
