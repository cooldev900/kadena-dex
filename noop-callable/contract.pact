(namespace "n_333c3b4ae9d5b16f14c87269388739c16bae9e7c")

(module myswap-noop-callable GOVERNANCE
  "Noop implementation of swap-callable-v1"
  (implements myswap-callable-v1)
  (defcap GOVERNANCE () (enforce-guard (enforce-keyset 'myswap-admin)))
  (defun swap-call:bool
    ( token-in:module{fungible-v2}
      token-out:module{fungible-v2}
      amount-out:decimal
      sender:string
      recipient:string
      recipient-guard:guard
    )
    "Noop implementation"
    true
  )
)