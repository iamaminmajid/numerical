
const parser = math.parser();

var r1 = 0;
var r2 = 0;
var it = 1; 
var r1Changed = false;
var r2Changed = false;

var eq = '';

function iteration(){

	if(it === 1){
		r1 = document.querySelector('#r1').value;	
		r2 = document.querySelector('#r2').value;
		eq = document.querySelector('#eq').value;
	}

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

	if(sol > r1){
		r1 = sol;
		r1Changed = true;
	}else{
		r2 = sol;
		r2Changed = true;
	}

	document.querySelector('.solution').innerHTML += `<div class="sol">
	<div class="solver">
	Range:
	</div>

	<div class="solver">
		[${a},${b}]
	</div>

	</div>`;

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

var solver = '(a*fb - b*fa)/(fb - fa)';


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