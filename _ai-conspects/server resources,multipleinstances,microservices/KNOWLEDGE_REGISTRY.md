# Knowledge Registry

Source: `01-final-transcript.md`; supporting fidelity layer: `02-source-preserving-transcript-v002.md`; SVG: `source/server resources,multipleinstances,microservices(1).svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01: CPU/memory/network limits, symptoms, path bandwidth, early rejection | `architecture.server-resource-saturation` | `architecture` | `../_knowledge/architecture/server-resource-saturation.md` | MAPPED |
| R01: sockets/workers/disk/dependency pools/OS/TLS/application resources and operating rules | `architecture.server-resource-saturation` | `architecture` | `../_knowledge/architecture/server-resource-saturation.md` | MAPPED |
| End-to-end capacity stages, queue growth, backpressure and bottleneck-targeted scaling | `architecture.server-resource-saturation` | `architecture` | `../_knowledge/architecture/server-resource-saturation.md` | MAPPED |
| R02: vertical/horizontal scaling and scaled-monolith distinction | `architecture.horizontal-scaling-and-state` | `architecture` | `../_knowledge/architecture/horizontal-scaling-and-state.md` | MAPPED |
| R02: instance-local state risks, durable alternatives, sticky-session caveat, downstream pressure | `architecture.horizontal-scaling-and-state` | `architecture` | `../_knowledge/architecture/horizontal-scaling-and-state.md` | MAPPED |
| R03: service definition/properties and separation from instance count | `architecture.microservices-boundaries-and-costs` | `architecture` | `../_knowledge/architecture/microservices-boundaries-and-costs.md` | MAPPED |
| R03: benefits, distributed-system costs, and scaled-monolith decision rule | `architecture.microservices-boundaries-and-costs` | `architecture` | `../_knowledge/architecture/microservices-boundaries-and-costs.md` | MAPPED |
| Coverage and screenshot bookkeeping | — | — | — | NON_LEARNING |

The one source separates naturally into capacity, multi-instance correctness, and service decomposition. No learning claim was intentionally excluded.

| Status | Count |
|---|---:|
| MAPPED | 7 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
