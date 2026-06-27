# OPT04 - OptionsMonitor / OnChange / background service implementation

Conspect: `options-pattern`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-02 12:46:38 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- IOptionsMonitor is appropriate for singleton/background services that need changing config.
- OnChange returns IDisposable and should be disposed.
- A background loop can read CurrentValue each cycle to observe changed options.
- The sensor example models threshold checks and periodic polling driven by options.

Reading quality:
```text
Overall: high.
Cropped/obscured IDE screenshots are marked as partial in source metadata.
Confidence: high for concepts; medium-high for exact code where screenshot is cropped or collapsed.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-031, S-032, S-033, S-034, S-035, S-036, S-037, S-038, S-039, S-040
```

Boundary decision:
```text
OPT04 covers IOptionsMonitor in singleton/background-service scenarios, OnChange subscriptions, disposal, and a sensor-monitoring example.
```

Pending after this region:
```text
none inside NEXT01; after transcript, final closure/audit remains
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| OPT04A-S001 | S-031 | IU-031 | `4aabd15a3e` | OPT04A | `verified-from-source-image` | no | Options Monitoring title |
| OPT04A-S002 | S-032 | IU-032 | `9a5adc97bf` | OPT04A | `verified-visible-partial-from-source-image` | bottom-cropped-after-IOptionsMonitor-section | Service lifetimes and options interfaces |
| OPT04A-S003 | S-033 | IU-033 | `9fa2aaa942` | OPT04A | `verified-from-source-image` | no | Sensor monitoring flow diagram |
| OPT04B-S001 | S-034 | IU-034 | `d3253050f2` | OPT04B | `verified-from-source-image` | no | SensorFactory creates sensor services |
| OPT04B-S002 | S-035 | IU-035 | `dbfbf62e2a` | OPT04B | `verified-from-source-image` | no | FakeSensorService gradual temperature changes |
| OPT04B-S003 | S-036 | IU-036 | `f5cd523fd2` | OPT04B | `verified-visible-partial-from-source-image` | top/bottom-cropped | Register sensor monitor service and validated options |
| OPT04B-S004 | S-037 | IU-037 | `f869f347ba` | OPT04B | `verified-from-source-image` | no | SensorMonitorService constructor subscribes to OnChange |
| OPT04B-S005 | S-038 | IU-038 | `34fdcc1943` | OPT04B | `verified-visible-partial-from-source-image` | top-cropped | OnOptionsChanged logs latest options |
| OPT04B-S006 | S-039 | IU-039 | `d7f314fca1` | OPT04B | `verified-from-source-image` | no | Dispose OnChange subscription |
| OPT04B-S007 | S-040 | IU-040 | `61b8bc2088` | OPT04B | `verified-from-source-image` | no | Background loop reads CurrentValue repeatedly |

---

## 2. Verified source transcript

## 2.1 OPT04A

### OPT04A-S001 / S-031 - `4aabd15a3e`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Options Monitoring title

#### Visible text

```text
Options Monitoring.
```

---

### OPT04A-S002 / S-032 - `9a5adc97bf`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `bottom-cropped-after-IOptionsMonitor-section`
- confidence: `high-for-visible-text`
- theme: Service lifetimes and options interfaces

#### Visible text

```text
Service lifetime reminder:
- Transient: created anew each time requested.
- Scoped: created anew for a single scope as needed.
- Singleton: created once for app lifetime.

Options interfaces:
- IOptions<TOptions>: singleton service lifetime; only read once at app startup.
- IOptionsSnapshot<TOptions>: scoped service lifetime; values recomputed for each new scope; designed for transient/scoped dependencies.
- IOptionsMonitor<TOptions>: singleton service lifetime; enables change detection and supports dynamic reloading of values.
```

---

### OPT04A-S003 / S-033 - `9fa2aaa942`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Sensor monitoring flow diagram

#### Visible text

```text
Flow diagram for sensor monitoring:
- Start
- Check Temperature
- if within threshold, log temperature
- if outside threshold, send alert
- wait for next cycle
- loop back to Start / Check Temperature

This diagram motivates an OptionsMonitor-driven background service whose thresholds can change while the service is running.
```

---

## 2.2 OPT04B

### OPT04B-S001 / S-034 - `d3253050f2`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: SensorFactory creates sensor services

#### Visible text

```text
SensorFactory caches/creates ISensorService instances by name using a case-insensitive dictionary. Create(name) returns an existing service if cached; otherwise it creates and stores a new FakeSensorService for the name.
```

#### Visible code

```csharp
internal sealed class SensorFactory
{
    private readonly Dictionary<string, ISensorService> _sensors =
        new Dictionary<string, ISensorService>(
            comparer: StringComparer.OrdinalIgnoreCase);

    public ISensorService Create(string name)
    {
        if (_sensors.TryGetValue(name, out var service))
        {
            return service;
        }

        return _sensors[name] = name switch
        {
            // TODO: Add real sensors ...
            _ => new FakeSensorService()
        };
    }
}
```

#### Notes

Right side partially obscured but main logic is readable.

---

### OPT04B-S002 / S-035 - `dbfbf62e2a`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: FakeSensorService gradual temperature changes

#### Visible text

```text
FakeSensorService emulates a sensor. It has constructor parameters initialTemperature = 65, minChange = -0.05, maxChange = 0.5. ReadTemperature changes current temperature by a random amount within that range and returns the updated current temperature.
```

#### Visible code

```csharp
internal sealed class FakeSensorService(
    double initialTemperature = 65,
    double minChange = -0.05,
    double maxChange = 0.5) : ISensorService
{
    private double _currentTemperature = initialTemperature;

    public double ReadTemperature()
    {
        var change = Random.Shared.NextDouble() *
            (maxChange - minChange) + minChange;

        _currentTemperature += change;

        return _currentTemperature;
    }
}
```

---

### OPT04B-S003 / S-036 - `f5cd523fd2`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top/bottom-cropped`
- confidence: `high-for-visible-code`
- theme: Register sensor monitor service and validated options

#### Visible text

```text
Registration:
- SensorFactory as singleton
- SensorMonitorService as hosted service
- SensorStationOptions with ValidateOnStart, bound from SensorStationOptions section, with DataAnnotations validation
```

#### Visible code

```csharp
builder.Services.AddSingleton<SensorFactory>();
builder.Services.AddHostedService<SensorMonitorService>();

builder.Services.AddOptionsWithValidateOnStart<SensorStationOptions>()
    .BindConfiguration(
        configSectionPath:
            SensorStationOptions.SensorStationOptionsSectionName)
    .ValidateDataAnnotations();
```

---

### OPT04B-S004 / S-037 - `f869f347ba`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: SensorMonitorService constructor subscribes to OnChange

#### Visible text

```text
SensorMonitorService is a BackgroundService. It depends on:
- SensorFactory
- IOptionsMonitor<SensorStationOptions>
- ILogger<SensorMonitorService>

It stores those dependencies and subscribes to options.OnChange(OnOptionsChanged). The returned IDisposable is stored in _onChangeDisposable.
```

#### Visible code

```csharp
internal sealed class SensorMonitorService : BackgroundService
{
    private readonly SensorFactory _sensorFactory;
    private readonly IOptionsMonitor<SensorStationOptions> _options;
    private readonly ILogger<SensorMonitorService> _logger;
    private readonly IDisposable? _onChangeDisposable;

    public SensorMonitorService(
        SensorFactory sensorFactory,
        IOptionsMonitor<SensorStationOptions> options,
        ILogger<SensorMonitorService> logger)
    {
        _sensorFactory = sensorFactory;
        _options = options;
        _logger = logger;
        _onChangeDisposable = options.OnChange(OnOptionsChanged);
    }
}
```

#### Notes

Screenshot bottom/right are partially obscured, but dependency fields and OnChange subscription are readable.

---

### OPT04B-S005 / S-038 - `34fdcc1943`

Metadata:
- status: `verified-visible-partial-from-source-image`
- readability: `high`
- cut off: `top-cropped`
- confidence: `high-for-visible-code`
- theme: OnOptionsChanged logs latest options

#### Visible text

```text
OnOptionsChanged receives latestOptions and logs that thresholds changed, including the options object in the log message.
```

#### Visible code

```csharp
private void OnOptionsChanged(SensorStationOptions latestOptions)
{
    _logger.LogInformation(
        """
        Threshold's changed:
          {Options}
        """,
        latestOptions);
}
```

---

### OPT04B-S006 / S-039 - `d7f314fca1`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Dispose OnChange subscription

#### Visible text

```text
OnChange returns an IDisposable subscription. Dispose should dispose it, then call base.Dispose().
```

#### Visible code

```csharp
public override void Dispose()
{
    _onChangeDisposable?.Dispose();

    base.Dispose();
}
```

---

### OPT04B-S007 / S-040 - `61b8bc2088`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Background loop reads CurrentValue repeatedly

#### Visible text

```text
ExecuteAsync loop:
- runs while stoppingToken is not cancellation requested
- reads _options.CurrentValue each cycle
- iterates sensors from options.Sensors or empty dictionary
- creates/gets sensor service from SensorFactory
- reads temperature
- calls AlertSensorReadings(sensor, temp, thresholds)
- waits for options.PollingInterval with the stopping token

This demonstrates why IOptionsMonitor is useful in a singleton/background service: the loop can observe changed options between cycles.
```

#### Visible code

```csharp
protected override async Task ExecuteAsync(CancellationToken stoppingToken)
{
    while (!stoppingToken.IsCancellationRequested)
    {
        var options = _options.CurrentValue;

        foreach (var (sensor, thresholds) in
            options.Sensors ?? Dictionary<string, ThresholdOptions>[])
        {
            var service = _sensorFactory.Create(sensor);

            var temp = service.ReadTemperature();

            AlertSensorReadings(sensor, temp, thresholds);
        }

        await Task.Delay(
            options.PollingInterval,
            stoppingToken);
    }
}
```

#### Notes

Right edge is partially obscured; cancellationToken parameter is inferred from visible label and BackgroundService pattern.

---

## 3. Cleaned source notes

- IOptionsMonitor is a good fit for singleton/background services that must react to config changes.
- OnChange returns IDisposable; store and dispose it.
- Reading CurrentValue inside the loop lets the service see updated thresholds/polling interval.
- Validate options on start for background services so bad config is caught before the service loop runs.

---

## 4. Question hooks

- Why does a BackgroundService need IOptionsMonitor instead of IOptionsSnapshot?
- What does OnChange return?
- Why dispose the OnChange subscription?
- Why read CurrentValue inside each loop cycle?
