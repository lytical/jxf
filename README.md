# @lytical/jxf

JXF (short for JavaScript Tranformation) library provides a similar solution that XSLT provides, for plain old data (POD) JavaScript objects.\
Using JSPath for XPATH like DSL, declare transformation templates with declarative conditional statements, to transform your objects into a text formatted document. 

This lightweight implementation is extendable to support simple to complex transformation. 

Among other use cases... 

- Use it to automate document-driven business processes.
- Dynamically render content for emails; web pages; code generation.
- Utilize it for EDI processing. 

Built for TypeScript, you can utilize the library with plain old JavaScript. 

Supports ES6 environments in both DOM and NodeJS. 

## Getting Started 

After installing JXF, import and invoke the `jxf()` function. DSL usage documentation can be found in [JSPath]('https://www.npmjs.com/package/jspath'). 

**Please note:**
The current version of (@types/jspath@0.4.2) is outdated and does not properly exports the default apply() function.
Until this is corrected, you must `npm install -D @types/jspath` as a dev dependency to avoid TypeScript compile errors.
see: https://www.npmjs.com/package/@types/jspath

## Usage

```javascript
jxf(data, transforms, [variables]) 
```
### Where

| argument | description |
| --- | --- |
| data | an object or array |
| transforms | an array of one or more transformers and strings |
| variables | an optional object with keys are variable names and respective values. |
| **returns** | **an array for strings you can concatenate to compose any text document.** |

## Example

Let's say you want to create the following markdown...

### Markdown 
Thank you for your interest in our products. As discussed, the following are the top (2) products you are interested in.

| Product | Description | Cost |
| --- | --- | ---: |
| CRM | Our state-of-the-art Customer Relationship Management | $39 / mo |
| CMS | Build web applications and sites with No Coding required | $2500 / yr |

Let me know when you want to move forward...

Regards,

Sally Salesperson\
sally.salesperson@lytical.com

### Source Code

Import jxf:

```typescript
import jxf from '@lytical/jxf';
```

Using the following data:

```typescript
const data = {
  customer: {
    first_name: 'Barry',
    last_name: 'Hayles',
    email: 'barry.hayles@lytical.com',
  },
  product: [
    {
      name: 'CRM',
      description: 'Our state-of-the-art Customer Relationship Management',
      price: 39.0,
      term: 'monthly',
    },
    {
      name: 'CMS',
      description:
        'Build web applications and sites with No Coding required',
      price: 2500.0,
      term: 'yearly',
    },
  ],
  sales_rep: {
    name: 'Sally Salesperson',
    email: 'sally.salesperson@lytical.com',
  },
};
```

...and with the following transformation:

```typescript
const transform = [
  `Hi `,
  jxf_value_of('.customer.first_name'),
  `, 

Thank you for your interest in our products. As discussed, the following are the top (`,
  jxf_length('.product'),
  `) products you are interested in.

| Name | Description | Cost |
| --- | --- | ---: |
`,
  jxf_for_each('.product', [
  `| `,
  jxf_value_of('.name'),
  ` | `,
  jxf_value_of('.description'),
  ` | $`,
  jxf_value_of('.price'),
  ` / `,
  jxf_switch('.term', [
    jxf_case('.{. === "monthly"}', ['mo']),
    jxf_case('.{. === "yearly"}', ['yr']),
  ]),
  ` |
`,
  ]),
  `

Let me know when you want to move forward... 

Regards, 

`,
  jxf_value_of('.sales_rep.name'),
  `\\
`,
  jxf_value_of('.sales_rep.email'),
];
```

...perform the transformation:

```typescript
const rs = jxf(data, transform);
const message = rs.join('');
console.log(message);
```

## Documentation

A transformers takes as an argument (at the minimum), a selector string (to match the target data). (e.g. `'.property{. > 1.25}'`)

Creating a custom transformer involves returning function with the following signature: `(data, ctx) => string[]`

```typescript
import apply from 'jspath';

import type { jxf_transformer_t } from '@lytical/jxf/types';

export function my_custom_xformer(match: string): jxf_transformer_t {
  return (data, ctx): string[] => {
    const [val] = apply(match, data, ctx);
    return [val?.toString() ?? ''];
  };
}
```

`data` is the javascript type to select (match) and transform to an array of `string`.
`ctx` stores variables. Variable should be considered immutable within the context.

This library has standard transformers;

```typescript
import { ... } from '@lytical/jxf';
```

### Transformers

#### *jxf_value_of(match, [formatter])
---
Transforms a single scalar value to a string.

| Argument | Description |
| --- | --- |
| match | The selector to match the scalar value. |
| formatter | An optional callback function to specialize the formatting of the scalar value; `(val: any) => string`

#### * jxf_variable(name, match)
---
Set a variable name with selected (matched) data. This is useful in capturing values in outer `for` loops, to be used in inner `for` loops.

| Argument | Description |
| --- | --- |
| name | The variable name.
| match | The selector to match the variable value. |

Note: variable names starting with `$` are reserved.

Access the variables in your select (match) statement by prefixing the name with `$`. (e.g. `'.user{.age < $max_age}'`)

#### * jxf_with(match, transformers)
---
Select (match) data used in nested transformations.

| Argument | Description |
| --- | --- |
| match | The selector to match the scalar value. |
| transformers | An array of transformers to process the selected data.

#### * jxf_length(match)
---
Transforms a selected array's length. The following will not select the `product` array length `.product.length`.\
This statement will try to select the `length` property of the element(s) of the `product` array.

| Argument | Description |
| --- | --- |
| match | The selector to match the array. |

#### * jxf_if(match, transformers)
---
Execute the nested transformations if the selected (matched) value is truthy.

| Argument | Description |
| --- | --- |
| match | The selector to match the value, and test for truthyness. |
| transformers | An array of transformers to process the data in context if the match is truthy.

#### * jxf_switch(match, transformers)
---
Transforms a single scalar value to a string.

| Argument | Description |
| --- | --- |
| match | The selector to match the value to switch. |
| transformers | An array of `jxf_case()` transformers to test the matched value. (Note: any type of transformer can be added here, but this should be last in the array to handle a default case.)

#### * jxf_case(match, transformers)
---
Used as nested transformers to `jxf_switch()`, that are executed if the `match` case is truthy.

| Argument | Description |
| --- | --- |
| match | The selector to test the switched value. |
| transformers | An array of transformers to process the data in context if the match is truthy.

#### * jxf_for_each(match, transformers, [sort])
---
Execute the nested transformers for each item in a selected array.

| Argument | Description |
| --- | --- |
| match | The selector to match the array value. |
| transformers | An array of transformers to process each item in the matched array.

For each array item, the following variables are available.

| Name | Description |
| --- | --- |
| $even | true if the array item is in an even position |
| $first | true if the array item is first |
| $last | true if the array item is last |
| $length | the length of the array |
| $odd | true if the array item is in an odd position |
| $parent | the outer data |

#### * jxf_for_keys(match, transformers, [sort])
---
Execute the nested transformers for each key in a selected object.

| Argument | Description |
| --- | --- |
| match | The selector to match the first object value. |
| transformers | An array of transformers to process each key in the matched object.

Stay tuned! I have more packages to come.` 

*lytical(r) is a registered trademark of lytical, inc. all rights are reserved.*