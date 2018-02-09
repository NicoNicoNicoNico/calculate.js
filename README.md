# calculate.js
  将字符串按位进行计算，从而解决位数溢出造成的0.1不等于0.2的问题

# 使用方法
暴露加减乘除四个方法，分别是`add/sub/mult/div`,传入与传出的类型均为字符串。如果你传入的是数字类型，它将强制转为字符串来进行计算，不过在这个转换并不准确，容易引起后续的计算的错误。

```
***.add('0.1','0.2');
***.sub('0.1','0.2');
***.mult('0.1','0.2');
***.div('0.1','0.2');
```





***

# calculate.js
  Compute string by bit to solve the problem of 0.1 not equal to 0.2 due to bit overflow

# 使用方法
Expose the addition, subtraction, multiplication and division of four methods, respectively, is the add / sub / mult / div, incoming and outgoing types are strings. If you are passing in a number type, it will be forced into a string for the calculation, but the conversion is not accurate and can easily cause subsequent calculation errors.

```
***.add('0.1','0.2');
***.sub('0.1','0.2');
***.mult('0.1','0.2');
***.div('0.1','0.2');
```
