# R05 — Hashing theory: salt, pepper, key stretching and cost parameters

Generated: 2026-06-27 UTC

## Coverage

```text
Image uses: 41
SVG text nodes: 12
Status: visually and semantically verified
```

**Images:** S-051, S-052, S-053, S-054, S-055, S-056, S-057, S-058, S-059, S-060, S-061, S-062, S-063, S-064, S-065, S-066, S-067, S-068, S-069, S-070, S-071, S-072, S-073, S-074, S-075, S-076, S-077, S-078, S-079, S-080, S-081, S-082, S-083, S-084, S-085, S-086, S-087, S-088, S-089, S-090, S-091

**Text nodes:** T-056, T-057, T-058, T-059, T-060, T-061, T-062, T-063, T-064, T-065, T-066, T-069

## Verified transcript

### Password hashing is not encryption

Password storage should not allow recovery of the original password. A password is passed through a password KDF such as PBKDF2, bcrypt, scrypt or Argon2id. A fast general-purpose hash alone is unsuitable because an attacker can test guesses at extremely high rates.

### Correct stored model

The screenshots express the stored value conceptually as:

```text
KDF(password, salt, cost parameters [, pepper])
```

The database must contain everything needed for verification except the password itself and, when used, the pepper. A practical record stores the algorithm/version, cost parameters, salt and derived hash either as separate columns or in a self-describing encoded string.

### Salt

A salt is public, random and unique per password. It is stored next to the hash because it is needed for verification.

Its purpose is not secrecy. It:

- prevents reusable rainbow/precomputation tables;
- ensures equal passwords do not create equal stored values across users;
- forces an attacker to work separately against each account.

A salt does not make a fast hash adequate; the KDF must still be expensive.

### Pepper

A pepper is an optional application-wide secret kept outside the database, such as in a secret manager. If only the database is stolen, the attacker also needs the pepper to test guesses.

Pepper introduces operational risk: availability, backup and rotation must be designed. Losing it can make all passwords unverifiable. It is defense in depth, not a substitute for salt and a strong KDF.

### Key stretching and determinism

Key stretching makes each password guess expensive. The KDF is deterministic for the same password, salt, algorithm/version, cost parameters and pepper. That determinism is necessary for login verification.

The random-looking difference between two users with the same password comes from their different salts, not from the KDF changing output randomly for identical complete inputs.

### Cost parameters

Cost parameters must be stored because verification must reproduce the original work and because policy increases should not invalidate old records.

- PBKDF2 uses an iteration count.
- bcrypt uses a logarithmic cost: increasing the cost by one approximately doubles the work.
- Argon2id exposes memory cost, time cost/passes and parallelism.

For Argon2id, memory is usually chosen first based on concurrency and available RAM, then time cost is adjusted to the latency target, with parallelism selected according to server throughput constraints.

### Tuning

There is no universal iteration or cost value. Tune on production-like hardware and select the highest cost compatible with login latency, throughput and denial-of-service constraints. Published baselines are starting points, not replacements for measurement.

The screenshots discuss representative latency targets and contemporary guidance, while warning that library defaults and recommendations change over time.

### Registration and login flow

Registration:

1. generate a random salt;
2. choose current algorithm and cost parameters;
3. optionally read a pepper from secret storage;
4. derive the hash;
5. store salt, parameters, version and derived bytes.

Login:

1. load the stored record;
2. derive a candidate using the submitted password and stored parameters;
3. compare using constant-time equality;
4. if the record is valid but below current policy, rehash with current parameters and update it.

### Threat-model comparisons

The screenshots contrast several failure modes:

- plaintext: immediate disclosure;
- fast unsalted hash: rapid brute force and reusable precomputation;
- strong KDF without salt: expensive guesses but identical-password correlation remains;
- salt plus fast hash: unique records but guesses are still cheap;
- salt plus strong KDF: correct baseline;
- optional pepper: additional protection when database and application secrets are compromised separately.

## Boundary conclusion

R05 closes the full theory branch: attacker model, storage model, salt/pepper, deterministic key stretching, PBKDF2/bcrypt/Argon2id costs, tuning and complete registration/login flow.
