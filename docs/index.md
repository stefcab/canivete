#### [Promise](#promise)
* [waitInPromise](#waitInPromise)

#### [String](#string)
* [afterFirst](#afterFirst)
* [afterLast](#afterLast)
* [beforeFirst](#beforeFirst)
* [beforeLast](#beforeLast)

---

## Promise

### `waitInPromise([delay = 0])`

Atrasa o encadeamento de uma Promise por um tempo determinado.

```javascript
Promise.resolve("aguardando")
	.then(waitInPromise(500))
	.then(console.log);

// => "aguardando"
// mostrado depois de 500 milisegundos.
```

## String

### `afterFirst(str, delimiter)`

Dadas duas strings – sentença e delimitador –, retorna uma string com os caracteres **posteriores à primeira ocorrência** do delimitador na sentença. Caso o delimitador não seja encontrado, retorna uma string vazia.

```javascript
afterFirst("paralelepípedo", "le");

// => "lepípedo"
```

### `afterLast(str, delimiter)`

Dadas duas strings – sentença e delimitador –, retorna uma string com os caracteres **posteriores à última ocorrência** do delimitador na sentença. Caso o delimitador não seja encontrado, retorna uma string vazia.

```javascript
afterLast("paralelepípedo", "le");

// => "pípedo"
```

### `beforeFirst(str, delimiter)`

Dadas duas strings – sentença e delimitador –, retorna uma string com os caracteres **anteriores à primeira ocorrência** do delimitador na sentença. Caso o delimitador não seja encontrado, retorna uma string vazia.

```javascript
beforeFirst("paralelepípedo", "le");

// => "para"
```

### `beforeLast(str, delimiter)`

Dadas duas strings – sentença e delimitador –, retorna uma string com os caracteres **anteriores à última ocorrência** do delimitador na sentença. Caso o delimitador não seja encontrado, retorna uma string vazia.

```javascript
beforeLast("paralelepípedo", "le");

// => "parale"
```

