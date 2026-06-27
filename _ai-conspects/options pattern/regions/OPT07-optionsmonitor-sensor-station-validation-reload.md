# OPT07 — OptionsMonitor sensor-station example, validation, and reload limits

Status: **verified correction transcript v001**  
Restored sources: **S-041..S-056 (16 image uses)**

## Example model

The restored column completes the concrete monitoring example. A `BackgroundService` repeatedly reads station temperatures, compares them against named low/high thresholds and logs either a normal reading or an out-of-range alert. The thresholds and polling interval are bound from configuration.

`SensorStationOptions` contains:

- a configuration-section name;
- `PollingInterval` with range/format validation;
- a required dictionary of named sensors;
- `ThresholdOptions` values with required low/high bounds.

The options classes use source-generated validation (`[OptionsValidator]` / `IValidateOptions<T>`) together with DataAnnotations-style constraints.

## Runtime monitoring

`IOptionsMonitor<SensorStationOptions>` supports long-running singleton/background services:

- read `CurrentValue` on each cycle, or cache state and update it from `OnChange`;
- `OnChange` returns an `IDisposable` subscription, which must be disposed when the service stops;
- when a reload-capable configuration provider changes, the options system rebinds the section, updates the current value and invokes callbacks.

The console captures demonstrate normal readings, an alert for an out-of-range station, and then changed thresholds/polling values after configuration reload.

## Reload limitations

Reload notifications depend on the underlying provider. JSON/key-per-file and other reload-capable providers can notify changes, but file shares, containers and some hosting environments may not deliver reliable file-system notifications. A polling file watcher such as `DOTNET_USE_POLLING_FILE_WATCHER=true` can be needed in those environments.

## Source-by-source verification

| Source | Summary | Evidence |
|---|---|---|
| S-041 | AlertSensorReadings compares a reading with configured low/high thresholds and logs normal versus critical/out-of-range results. | `audit-assets/correction-missing-images/S-041_266683beac.png` |
| S-042 | SensorStationOptions is a source-generated options validator target and exposes a configuration section name and polling interval. | `audit-assets/correction-missing-images/S-042_acdec0572e.png` |
| S-043 | PollingInterval is validated with TimeSpan range and HH:mm:ss regular-expression constraints. | `audit-assets/correction-missing-images/S-043_56b3859ad8.png` |
| S-044 | The Sensors dictionary is required and maps station names to ThresholdOptions. | `audit-assets/correction-missing-images/S-044_ce797371e0.png` |
| S-045 | ThresholdOptions validates the required low threshold and its allowed numeric range. | `audit-assets/correction-missing-images/S-045_f71bb698a9.png` |
| S-046 | ThresholdOptions validates the required high threshold and its allowed numeric range. | `audit-assets/correction-missing-images/S-046_36c9de59e1.png` |
| S-047 | appsettings SensorOptions example with PollingInterval and named Roof, Roof 2, Garage and other sensor thresholds. | `audit-assets/correction-missing-images/S-047_7d838c4d72.png` |
| S-048 | Continuation of the named sensor threshold configuration, including Patio. | `audit-assets/correction-missing-images/S-048_0d16d2223a.png` |
| S-049 | Console output shows current sensor options and an out-of-range Garage reading. | `audit-assets/correction-missing-images/S-049_a929f09624.png` |
| S-050 | Runtime log demonstrates normal readings, a critical Garage reading, and graceful host shutdown. | `audit-assets/correction-missing-images/S-050_194ba45599.png` |
| S-051 | Runtime output demonstrates configuration reload: polling interval and threshold ranges change without restarting the service. | `audit-assets/correction-missing-images/S-051_8fb91f0dd6.png` |
| S-052 | Monitoring limitations: only reload-capable providers notify changes; file shares/containers can make notifications unreliable and polling watcher may be needed. | `audit-assets/correction-missing-images/S-052_299a1c3c3b.png` |
| S-053 | Sensor monitor scenario: a BackgroundService reads temperature, compares options-driven thresholds, logs or alerts, waits and repeats. | `audit-assets/correction-missing-images/S-053_f4acae6ece.png` |
| S-054 | OptionsMonitor.OnChange returns IDisposable; disposing the subscription unsubscribes the listener. | `audit-assets/correction-missing-images/S-054_a49b1f9d95.png` |
| S-055 | IOptionsMonitor provides CurrentValue for each cycle and OnChange callbacks for immediate reactions. | `audit-assets/correction-missing-images/S-055_4046cb3143.png` |
| S-056 | Reload flow: configuration provider reloads, options are rebound, CurrentValue updates and OnChange fires; intended for long-running services. | `audit-assets/correction-missing-images/S-056_188acce1a2.png` |
