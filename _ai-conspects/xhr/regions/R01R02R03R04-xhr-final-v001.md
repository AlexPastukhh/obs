# Final semantic transcript — XMLHttpRequest, progress, response types and incremental text

Authoritative source: `source/xhr.svg`  
Coverage: **21 unique screenshots / 21 placements + 6 native SVG labels**

---

# R01 — request setup and response types

A basic asynchronous request:

```js
const xhr =
  new XMLHttpRequest();

xhr.open(
  "GET",
  url,
  true,
);

xhr.responseType = "json";

xhr.onload = () => {
  if (
    xhr.status >= 200
    && xhr.status < 300
  ) {
    console.log(xhr.response);
  }
};

xhr.onerror = () => {
  console.error("Network error");
};

xhr.send();
```

The third argument to `open()` decides asynchronous behavior:

```text
true
    asynchronous, normal browser usage

false
    synchronous, blocks the main thread and is discouraged
```

`open()` only configures the request. `send()` starts it. Wrapping XHR in a Promise does not change a synchronous request into an asynchronous one; the `async` flag still controls that.

Common response types:

```text
"" or "text"
    responseText / response is a string

"json"
    response is parsed after completion

"arraybuffer"
    response is an ArrayBuffer

"blob"
    response is a Blob

"document"
    response is a Document where supported
```

There is no universal `bytes` property. For raw bytes, request an `ArrayBuffer` and create a typed-array view:

```js
xhr.responseType =
  "arraybuffer";

xhr.onload = () => {
  const bytes =
    new Uint8Array(
      xhr.response,
    );
};
```

---

# R02 — progress and incremental text

XHR exposes download progress events:

```js
xhr.onprogress = (event) => {
  if (event.lengthComputable) {
    console.log(
      event.loaded,
      event.total,
    );
  }
};
```

Progress reports how much data arrived; it does not necessarily provide the newly arrived raw byte chunk.

For textual responses, `responseText` can grow during download in supporting browser behavior. An incremental line parser can track the already processed prefix:

```js
let lastIndex = 0;
let buffer = "";

xhr.onprogress = () => {
  const chunk =
    xhr.responseText.slice(
      lastIndex,
    );

  lastIndex =
    xhr.responseText.length;

  buffer += chunk;

  let newline;

  while (
    (newline =
      buffer.indexOf("\n")) >= 0
  ) {
    const line =
      buffer.slice(
        0,
        newline,
      ).trim();

    buffer =
      buffer.slice(
        newline + 1,
      );

    if (line) {
      onItem(
        JSON.parse(line),
      );
    }
  }
};
```

This fits line-delimited JSON, logs and text streams. `slice(lastIndex)` takes only text not previously processed.

At completion, flush a final non-newline-terminated item:

```js
xhr.onload = () => {
  const line = buffer.trim();

  if (line) {
    onItem(JSON.parse(line));
  }
};
```

---

# R03 — limits of binary streaming and line parsing details

XHR was designed around a request plus events plus a final response. Browser implementations generally expose `ArrayBuffer` or `Blob` meaningfully at completion, not as a clean sequence of raw byte chunks.

Therefore:

```text
onprogress
    reports progress

responseText
    may support incremental decoded text

arraybuffer/blob response
    normally final binary value

true chunk-by-chunk byte consumption
    better modeled by Fetch ReadableStream
```

Incremental text is decoded text, not original byte chunks. UTF-8 characters can span multiple source bytes, and the browser manages the decoding before exposing `responseText`.

Line parsing details:

```text
buffer.indexOf("\n")
    finds one complete line boundary

buffer.slice(0, newline)
    extracts that line

buffer.slice(newline + 1)
    keeps the unprocessed tail

trim()
    removes spaces, tabs, \n and \r from both ends
```

Using `trim()` conveniently handles Windows `\r\n`, but it also removes meaningful surrounding whitespace. A stricter parser can remove only a trailing `\r`.

---

# R04 — lifecycle events, readyState, timeout and abort

XHR ready states:

```text
0 UNSENT
1 OPENED
2 HEADERS_RECEIVED
3 LOADING
4 DONE
```

```js
xhr.onreadystatechange = () => {
  if (xhr.readyState >= 2) {
    console.log(
      xhr.status,
      xhr.getResponseHeader(
        "Content-Type",
      ),
    );
  }

  if (xhr.readyState === 4) {
    console.log("done");
  }
};
```

High-level events include:

```text
loadstart
progress
load
loadend
error
abort
timeout
readystatechange
```

Timeout:

```js
xhr.timeout = 5000;

xhr.ontimeout = () => {
  console.error("Timed out");
};
```

Cancellation:

```js
xhr.abort();
```

A Promise wrapper can expose cancellation separately because a Promise itself has no built-in abort method:

```js
function request(url) {
  const xhr =
    new XMLHttpRequest();

  const promise =
    new Promise(
      (resolve, reject) => {
        xhr.open(
          "GET",
          url,
          true,
        );

        xhr.onload = () =>
          resolve(xhr.response);

        xhr.onerror = reject;
        xhr.onabort = () =>
          reject(
            new DOMException(
              "Aborted",
              "AbortError",
            ));

        xhr.send();
      });

  return {
    promise,
    abort: () => xhr.abort(),
  };
}
```

Use XHR when its mature event surface or upload progress is required. Use Fetch plus streams for modern progressive response-body byte processing.

---

# Coverage

```text
unique embedded screenshots: 21
image uses: 21
native SVG labels: 6
duplicate extra placements: 0

processed image uses: 21
processed text labels: 6
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
