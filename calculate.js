// 切分数字
var split = function(number){
  if(typeof number !== 'string'){
    number = String(number)
  }
  var num = {
    pos: '',
    left: '',
    right: ''
  };

  num.pos = number.search(/\./);
  if(num.pos >= 0){
    for(var i = 0; i < num.pos; i++){
      num.left += number[i];
    }
    for(var j = num.pos + 1; j < number.length; j++){
      num.right += number[j];
    }
  }else{    
    num.left = number;
  }
  return num;
}

//用0填充空白位
var fill = function(num1, num2){
  var leftReduction = num1.left.length - num2.left.length;
  var rightReduction = num1.right.length - num2.right.length;

  if(leftReduction < 0){
    leftReduction = -leftReduction;
    for(var i = 0; i < leftReduction; i++){
      num1.left = '0' + num1.left
    }
  }else{
    for(var j = 0; j < leftReduction; j++){
      num2.left = '0' + num2.left
    }
  }

  if(rightReduction < 0){
    rightReduction = -rightReduction;
    for(var i = 0; i < rightReduction; i++){
      num1.right = num1.right + '0';
    }
  }else{
    for(var j = 0; j < rightReduction; j++){
      num2.right = num2.right + '0';
    }
  }
}

var format = function(string){
  return string
    .replace(/^0+/,'')
    .replace(/^\./, '0.')
    .replace(/^0+\./,'0.')
    .replace(/\.0+$/,'')
    .replace(/\.\d+0+$/, () => string.match(/\.\d+0+/)[0].replace(/0+$/, ''));
}


/**
 * { add }
 *
 * @param      {string}  num1    string
 * @param      {string}  num2    string
 * @return     {string}  { result }
 */
exports.add = function (num1 , num2) {
  var n1 = split(num1);
  var n2 = split(num2);
  fill(n1, n2);

  var result = '';
  var tmp_result = '';
  var carryFlag = 0;

  var _add = function(str1, str2){
    if(str1.length > 0 && str2.length > 0 && str1.length === str2.length){
      for(var i = str1.length-1; i >= 0; i--){
        tmp_result = Number(str2[i]) + Number(str1[i]) + Number(carryFlag);
        carryFlag = Math.floor(tmp_result/10);
        result = String(tmp_result%10) + result;
      }
    }
  }

  _add(n1.right, n2.right);

  if(n1.pos > -1 || n2.pos > -1){
    result = '.' + result;
  }

  _add(n1.left, n2.left);

  if(carryFlag != 0){
    result = carryFlag + result;
  }

  return format(result);
}


/**
 * { subtract }
 *
 * @param      {string}  num1    string
 * @param      {string}  num2    string
 * @return     {string}  { computed result }
 */
exports.sub = function (num1 , num2) {
  var minus,minused;

  if(num1 > num2){
    minused = split(num1);
    minus = split(num2);
  }else{
    minus = split(num1);
    minused = split(num2);
  }
  fill(minused, minus);

  var result = '';
  var tmp_result = '';
  var carryFlag = [];
  var minused_splice = minused.left + minused.right;
  var count_pos = 0;

  for(var k = 0; k < minused_splice.length; k++){
    carryFlag[k] = new Array();
    for(var j = 0; j < minused_splice.length; j++){
      carryFlag[k][j] = "";
    }
  }

  var _sub = function(minused, minus){
    if(minused.length > 0 && minus.length > 0 && minused.length === minus.length){
      for(var i = minused.length-1; i >= 0; i--){
        tmp_result = Number(minused[i]) - Number(minus[i]);
        for(var z = 0; z < minused_splice.length; z++){
          tmp_result += Number(carryFlag[z][count_pos]);
        }

        if(tmp_result < 0){
          for(a = count_pos+1; a < minused_splice.length; a++){
            if(minused_splice[count_pos] !== 0){
              carryFlag[count_pos][a] = -1;
              break;
            }else{
              carryFlag[count_pos][a] = 9;
            }
          }
          tmp_result += 10;
        }
        count_pos++;
        result = String(tmp_result) + result;
      }
    }
  };

  _sub(minused.right, minus.right);

  if(minused.pos > -1 || minus.pos > -1){
    result = '.' + result;
  }

  _sub(minused.left, minus.left);

  return format(result);
}

/**
 * { multiplicate }
 *
 * @param      {<type>}  num1    string
 * @param      {<type>}  num2    string
 * @return     {<type>}  { computed result }
 */
exports.mult = function (num1 , num2) {
  var n1 = split(num1);
  var n2 = split(num2);

  var carryFlag = 0;
  var result = '';
  var tmp_result = [];
  var _tmp = 0;
  var _point = n1.right.length + n2.right.length;
  var n1_splice = n1.left + n1.right;
  var n2_splice = n2.left + n2.right;

  if(n1_splice.length < n2_splice.length){
    var _change = n2_splice;
    n2_splice = n1_splice;
    n1_splice = _change;

    var _num = n2;
    n2 = n1;
    n1 = _num;
  }

  for(var k = 0; k < (n2_splice.length); k++){
    tmp_result[k] = new Array();
    for(var j = 0; j < (n1_splice.length + n2_splice.length); j++){
      tmp_result[k][j]="";
    }
  }

  for(var i = n2_splice.length - 1; i >= 0; i--){
    for(var j = n1_splice.length - 1; j >= 0; j--){
      var tmp_value = Number(n2_splice[i]) * Number(n1_splice[j]) + carryFlag;
      carryFlag = Math.floor(tmp_value/10);
      tmp_result[i][i+j+1] = tmp_value%10; 
    }
    if(carryFlag){
      tmp_result[i][i+j+1] = carryFlag;
    }
    carryFlag = 0;
  }

  for(var z = tmp_result[0].length - 1; z >= 0; z--){
    for(var x = tmp_result.length - 1; x >= 0; x--){
      if(tmp_result[x][z]){
        _tmp +=  tmp_result[x][z];
      }
    }
    _tmp += carryFlag;
    if(_tmp !== ''){
      carryFlag = Math.floor(_tmp / 10);
      result = String(_tmp % 10) + result;
    }
    _tmp = 0;
    if(_point > 0 && (tmp_result[0].length - z) === (_point)){
      result = '.' + result;
    }
  }

  return format(result);
}

/**
 * { divide }
 *
 * @param      {<type>}  divded          String
 * @param      {<type>}  div             String
 * @param      {number}  pointRight_len  Retain the decimal places
 * @return     {<type>}  { computed result }
 */
exports.div = function (divded ,div, pointRight_len) {
  var limit_len = pointRight_len + 1 || 3;

  var n1 = split(divded);
  var n2 = split(div);
  var _point;
  if(n1.pos < 0){
    _point = n1.left.length + n2.right.length;
  }else{
    _point = n1.pos + n2.right.length;
  }
  var n1_splice = n1.left + n1.right;
  var n2_splice = n2.left + n2.right;
  var _tmp = 0;
  var result = '';
  var _zero = limit_len;

  if(n1.right.length < n2.right.length){
    _zero += n2.right.length - n1.right.length;
  }

  for(var i = 0; i < _zero; i++){
    n1_splice += '0';
  }

  var _div = Number(n2_splice);

  for(var x = 0; x < n1_splice.length; x++){
    var _tmp_value = _tmp * 10 + Number(n1_splice[x]);
    result += String(Math.floor(_tmp_value / _div));
    _tmp = _tmp_value % _div;
    if(x === _point - 1){
      result += '.';
    }
  }
//末位四舍五入
  var _split = split(result);
  result = _split.left;
  if(_split.pos < 0){
  }else{
    result += '.';

    for(var z = 0; z < limit_len - 2; z++){
      result += _split.right[z];
    }
    if(Number(_split.right[limit_len - 1]) >= 5){
      result += String(Number(_split.right[limit_len - 2]) + 1);
    }else{
      result +=_split.right[limit_len - 2];
    }
  }

  return format(result);
}