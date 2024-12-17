(namespace "n_333c3b4ae9d5b16f14c87269388739c16bae9e7c")

(interface myswap-callable-v1
    " API for receiving a callback after a swap leg transfer \
    \ but before constant-product invariants are enforced."
    (defun swap-call:bool
      ( token-in:module{fungible-v2}
        token-out:module{fungible-v2}
        amount-out:decimal
        sender:string
        recipient:string
        recipient-guard:guard
      )
      " Operate on an optimistic swap of AMOUNT-OUT of TOKEN-OUT \
      \ from SENDER to RECIPIENT/RECIPIENT-GUARD. TOKEN-IN is provided \
      \ to give the pair context as well as the inbound amount swapped. \
      \ Boolean result value is ignored."
    )
  )