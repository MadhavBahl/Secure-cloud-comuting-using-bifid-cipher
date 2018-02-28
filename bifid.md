# Workflow for bifid cipher

This is the workflow for bifid cipher

## Setting up the private key

> Private key will be the input from user. Polybius square is a 5x5 matrix which is used as the private key.

- Input the private key

- Put it into Polybius square letter by letter ignoring the repetitions.

- Fill the remaining english alphabets in the blank spaces of Polybius square (the letters I and the J share their position in the Polybius square)

```js
  1 2 3 4 5
1 B G W K Z
2 Q P N D S
3 I O A X E
4 F C L U M
5 T H Y V R
```

- The message is converted to its coordinates in the usual manner, but they are written vertically beneath:

**Example**

```js
F L E E A T O N C E
4 4 3 3 3 5 3 2 4 3
1 3 5 5 3 1 2 3 2 5
```

- They are then read out in rows (lower row is concatenated in the first row)

```js
4 4 3 3 3 5 3 2 4 3 1 3 5 5 3 1 2 3 2 5
```

- Then divided up into pairs again, and the pairs turned back into letters using the Polybius square

```js
44 33 35 32 43 13 55 31 23 25
U  A  E  O  L  W  R  I  N  S
```

heroku_q35b5hnr