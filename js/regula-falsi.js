
const parser = math.parser();

var r1 = -0.8;
var r2 = -0.7;
var it = 1; 
var r1Changed = false;
var r2Changed = false;
function iteration(){
	let a = r1;
	let b = r2;

	let fa = check(a).toFixed(9);
	let fb = check(b).toFixed(9);
	if(r1Changed === false){
		fa = check(a).toFixed(4);
	}
	if(r2Changed === false){
		fb = check(b).toFixed(4);
	}
	
	let sol = checkR(a,b,fa,fb).toFixed(10);

	let fsol = check(sol).toFixed(10);
	
	let formatedEq = "";

	for(let i = 0; i<eq.length; i++){
		if(eq[i] == "^"){
			formatedEq += '<sup>';
			formatedEq += eq[i+1];
			formatedEq += '</sup>';
			i++;
			continue;
		}else{
			formatedEq += eq[i];
		}
	}
	formatedEq = formatedEq.replace(/x/g, "("+sol+")");

	if(fsol < 0){
		r1 = sol;
		r1Changed = true;
	}else{
		r2 = sol;
		r2Changed = true;
	}

	document.querySelector('.solution').innerHTML += `<div class="sol">
	<div class="solver">
		x<sub>${it}</sub> = 
	</div>

	<div class="solver">
		<div class="upper">
			<div id="a">a</div>
			<div id="op">.</div>
			<div id="fb">f(b)</div>
			<div id="op">-</div>
			<div id="b">b</div>
			<div id="op">.</div>
			<div id="fa">f(a)</div>
		</div>
		<div class="lower">
			<div id="fb">f(b)</div>
			<div id="op">-</div>
			<div id="fa">f(a)</div>
		</div>

	</div>

	<div class="solver">
		<div class="upper">
			<div id="a">${a}</div>
			<div id="op">.</div>
			<div id="fb">${fb}</div>
			<div id="op">-</div>
			<div id="b">${b}</div>
			<div id="op">.</div>
			<div id="fa">${fa}</div>
		</div>
		<div class="lower">
			<div id="fb">${fb}</div>
			<div id="op">-</div>
			<div id="fa">${fa}</div>
		</div>

	</div>

	<div class="solver">
	= ${sol}
	</div>

	</div>`;

	document.querySelector('.solution').innerHTML += `<div class="sol">
	<div class="solver">
		f(x<sub>${it}</sub>) = 
	</div>

	<div class="solver">
		f(${sol}) = 
	</div>

	<div class="solver">
		${formatedEq}
	</div>

	<div class="solver">
	= ${fsol}
	</div>

	</div>`;

	it++;


}

var eq = 'x^4-2x^3-4x^2+4x+4';
var solver = '(a*fb - b*fa)/(fb - fa)';

iteration();
iteration();
iteration();



//var eq = '2x cos(2x) - (x+1)^2'
const pos = getPosRange();
const neg = getNegRange();

function checkRange(p,n){
	for(var i = p + 0.1; check(i)>0; i=i+0.1){
		if(check(i+0.1)<0){
			document.writeln(check(i));
			break;
		}
		
	}
}

function getNegRange(){
	var n = check(-10);
	var pin = 0;
	for(var i=-10; i<10; i++){
		if((check(i) >= 0)){
			n = check(i);
			pin = i;
		}
	}
	return pin;
}
function getPosRange(){
	var n = check(-10);
	var pin = 0;
	for(var i=-10; i<10; i++){
		if((check(i) <= 0)){
			break;
			n = check(i)
			pin = i;
		}
	}
	return pin;
}

const allChecks = checkAll();

console.log(allChecks);
console.log(range(allChecks));

function range(arr){
	var r = Array();
	var i1, i2;
	for(i=0; i<19; i++){
		if(arr[i]['value'] > 0 && arr[i+1]['value'] < 0){
			i1 = arr[i]['index'];
			i2 = arr[i+1]['index'];
			res = i1 - i2;
			if(res == -1){
				//if(arr[i]['value'] - arr[i+1]['value'] <= 1 || arr[i]['value']-arr[i+1]['value'] >= -1){
					r.push({ index : arr[i]['index'], value: arr[i]['value']});
					r.push({ index : arr[i+1]['index'], value: arr[i+1]['value']});
					//break;
					console.log("f");
				//}
			}
		}
	}
	return r;
}

function checkAll(start = -10, end = 10){
	var arr = Array();
	for(var i=start; i<end; i++){
		n = check(i);
		arr.push({ index : i, value: n});
		//arr[i] = n;
	}
	return arr;
}

function check(n){
	parser.set('x', n);
	return parser.evaluate(eq);
}

function checkR(a,b,fa,fb){
	parser.set('a', a);
	parser.set('b', b);
	parser.set('fa', fa);
	parser.set('fb', fb);
	return parser.evaluate(solver);
}