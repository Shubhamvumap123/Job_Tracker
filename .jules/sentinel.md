## 2024-05-24 - Mass Assignment & Broken Access Control in Ticket Management
**Vulnerability:**
1. Mass Assignment in `updateTicket`: `customer` roles were able to pass arbitrary fields (`status`, `assignedTo`, `department`) in the request body to escalate privileges on their own tickets.
2. Broken Access Control (BAC) in `deleteTicket`: Any authenticated user (including `customer`) was implicitly allowed to delete tickets without an owner (`isOrphan = !ticket.user`).

**Learning:**
1. `TicketController.js` relied heavily on frontend hiding these fields. `req.body` values were spread and passed directly to `Ticket.findByIdAndUpdate()` without validating that the authenticated user's role had permission to edit those specific fields.
2. The logic `!isAdmin && !isOwner && !isOrphan` meant if a ticket was an orphan, it bypassed the check. So if `isOrphan` was true, the check evaluated to `false` and allowed the deletion to proceed. This is a common logic flaw when handling "special" states like orphans.

**Prevention:**
1. Never pass `req.body` directly to database update functions. Instead, explicitly define and selectively extract the fields the user is authorized to update based on their role (`req.user.role`).
2. When performing sensitive actions like deletion, use an explicit allowlist approach. Always verify `(isAdmin || (isOwner && !isOrphan))`. Explicitly deny access to edge cases unless specifically required by the role.