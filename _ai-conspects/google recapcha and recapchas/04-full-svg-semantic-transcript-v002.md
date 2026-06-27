# google recapcha and recapchas — full corrected-SVG semantic reconciliation v002

Generated: 2026-06-27 UTC

Screenshots are the primary source. Candidate regions and nearest labels were used only as navigation hints; every image was visually reviewed before final assignment.

## R01 — Core flow, keys, token verification, hostname, and purpose

The browser uses the public site key to render or execute reCAPTCHA and receives a short-lived token. The server keeps the secret key private, posts the token to Google's verification endpoint, and accepts the operation only after server-side verification. Validate success and preferably hostname; v3 additionally requires the expected action and an application-specific score threshold. reCAPTCHA reduces automated abuse but does not replace rate limiting, lockout, or ordinary validation.

**Reviewed image uses:** S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020, S-021

**Assigned SVG text nodes:** T-001, T-002, T-003, T-004, T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015, T-016, T-017, T-018, T-019, T-020

## R02 — reCAPTCHA v2 Razor and React integration with verification service

For v2 checkbox in Razor, load api.js, render the g-recaptcha element, and read g-recaptcha-response on submit. In React, explicit rendering with a widget id is safer across rerenders and supports getResponse/reset; a wrapper library can manage the widget. The ASP.NET Core verification service posts secret, response, and optional remoteip, deserializes success/error/hostname fields, and is registered through HttpClient.

**Reviewed image uses:** S-022, S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035, S-036, S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044, S-045, S-046, S-047, S-048, S-049, S-050, S-051, S-052, S-053, S-054

**Assigned SVG text nodes:** T-021, T-022, T-023, T-024, T-025, T-026, T-027, T-028, T-029, T-030, T-031, T-032, T-033, T-034, T-035, T-036, T-037, T-038, T-039, T-040, T-041, T-042, T-043, T-044, T-045, T-046, T-047, T-048, T-049, T-050, T-051, T-052, T-053, T-054, T-055, T-056, T-057, T-058, T-059, T-060, T-061, T-062, T-063, T-064, T-065, T-066, T-067, T-068, T-069, T-070, T-071, T-072, T-073, T-074, T-075, T-076, T-077, T-078, T-079, T-080, T-081, T-082, T-083, T-084, T-085, T-086, T-087, T-088, T-089, T-090, T-091, T-092, T-093, T-094, T-095, T-096, T-097, T-098, T-099, T-100, T-101, T-102, T-103, T-104, T-105, T-106, T-107, T-108, T-109, T-110, T-111, T-112, T-113, T-114, T-115, T-116, T-117, T-118, T-119, T-120, T-121, T-122, T-123, T-124, T-125, T-126, T-127, T-128, T-129, T-130, T-131, T-132, T-133, T-134, T-135, T-136, T-137, T-138, T-139, T-140, T-141, T-142, T-143, T-144, T-145, T-146, T-147, T-148, T-149, T-150, T-151, T-152, T-153, T-154, T-155, T-156, T-157, T-158, T-159, T-160, T-161, T-162, T-163, T-164, T-165, T-166, T-167, T-168, T-169, T-170, T-171, T-172, T-173, T-174, T-175, T-176, T-177, T-178, T-179, T-180, T-181, T-182, T-183, T-184, T-185, T-186, T-187, T-188, T-189, T-190, T-191, T-192, T-193, T-194, T-195, T-196, T-197, T-198, T-199, T-200, T-201, T-202, T-203, T-204, T-205, T-206, T-207, T-208, T-209, T-210, T-211, T-212, T-213, T-214, T-215, T-216, T-217, T-218, T-219, T-220, T-221, T-222, T-223, T-224, T-225, T-226, T-227, T-228, T-229, T-230, T-231, T-232, T-233, T-234, T-235, T-236, T-237, T-238, T-239, T-240, T-241, T-242, T-243, T-244, T-245, T-246, T-247, T-248, T-249, T-250, T-251, T-252, T-253, T-254, T-255, T-256, T-257, T-258, T-259, T-260, T-261, T-262, T-263, T-264, T-265, T-266, T-267, T-268, T-269, T-270, T-271, T-272, T-273, T-274, T-275, T-276, T-277, T-278, T-279, T-280, T-281, T-282, T-283, T-284, T-285, T-286, T-287, T-288, T-289, T-290, T-291, T-292, T-293, T-294, T-295, T-296, T-297, T-298, T-299, T-300, T-301, T-302, T-303, T-304, T-305, T-306, T-307, T-308, T-309, T-310, T-311, T-312, T-313, T-314, T-315, T-316, T-317, T-318, T-319, T-320, T-321, T-322, T-323, T-324, T-325, T-326, T-327, T-328, T-329, T-330, T-331, T-332, T-333, T-334, T-335, T-336, T-337, T-338, T-339, T-340, T-341, T-342, T-343, T-344, T-345, T-346, T-347, T-348, T-349, T-350, T-351, T-352, T-353, T-354, T-355, T-356, T-357, T-358, T-359, T-360, T-361, T-362, T-363, T-364, T-365, T-366, T-367, T-368, T-369, T-370, T-371, T-372, T-373, T-374, T-375

## R03 — reCAPTCHA v3 Razor and React action/score flow

v3 is invisible and action-based. The client loads api.js with render=siteKey, executes a stable action such as register immediately before submission, stores the returned token, and sends it to the backend. The server checks success, exact action, score threshold, optional hostname, and token age/error fields. Scores should drive policy: allow, add friction, or require a stronger challenge rather than treating one threshold as universal.

**Reviewed image uses:** S-055, S-056, S-057, S-058, S-059, S-060, S-061, S-062, S-063, S-064, S-065, S-066, S-067, S-068, S-069, S-070, S-071, S-072

**Assigned SVG text nodes:** T-376, T-377, T-378, T-379, T-380, T-381, T-382, T-383, T-384, T-385, T-386, T-387, T-388, T-389, T-390, T-391, T-392, T-393, T-394, T-395, T-396, T-397, T-398, T-399, T-400, T-401, T-402, T-403, T-404, T-405, T-406, T-407, T-408, T-409, T-410, T-411, T-412, T-413, T-414, T-415, T-416, T-417, T-418, T-419, T-420, T-421, T-422, T-423, T-424, T-425, T-426, T-427, T-428, T-429, T-430, T-431, T-432, T-433, T-434, T-435, T-436, T-437, T-438, T-439, T-440, T-441, T-442, T-443, T-444, T-445, T-446, T-447, T-448, T-449, T-450, T-451, T-452, T-453, T-454, T-455, T-456, T-457, T-458, T-459, T-460, T-461, T-462, T-463, T-464, T-465, T-466, T-467, T-468, T-469, T-470, T-471, T-472, T-473, T-474, T-475, T-476, T-477, T-478, T-479, T-480, T-481, T-482, T-483, T-484, T-485, T-486, T-487, T-488, T-489, T-490, T-491, T-492, T-493, T-494, T-495, T-496, T-497, T-498, T-499, T-500, T-501, T-502, T-503, T-504, T-505, T-506, T-507, T-508, T-509, T-510, T-511, T-512, T-513, T-514, T-515, T-516, T-517, T-518, T-519, T-520, T-521, T-522, T-523, T-524, T-525, T-526, T-527, T-528, T-529, T-530, T-531, T-532, T-533, T-534, T-535, T-536

## R04 — remoteip, forwarded headers, and reverse-proxy handling

remoteip is optional and represents the end user's IP. Behind a reverse proxy or CDN, HttpContext.Connection.RemoteIpAddress can otherwise be the proxy address. Configure and restrict forwarded headers before reading the value; send remoteip only when the deployment reliably resolves the real client IP and the extra signal is useful.

**Reviewed image uses:** S-073, S-074, S-075, S-076, S-077

**Assigned SVG text nodes:** T-537


## Closure

```text
embedded assets: 76
total image uses: 77
processed image uses: 77
restored image uses: 0
duplicate placements: 1
SVG text nodes: 537
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```
