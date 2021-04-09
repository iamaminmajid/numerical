
const parser = math.parser();

var r1 = 0;
var r2 = 0;
var it = 1; 
var r1Changed = false;
var r2Changed = false;

var eq = '';

var der = '';

function iteration(){

	if(it === 1){
		r1 = document.querySelector('#r1').value;	
		r2 = document.querySelector('#r2').value;
		eq = document.querySelector('#eq').value;
		der = derivative();
	}

	let a = r1;
	let b = r2;

	let fa = check(a).toFixed(9);
	let fb = check(b).toFixed(9);

	let sol = checkR(a).toFixed(10);

	
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

	let tol = (sol - a).toFixed(10);
	r1 = sol;

	document.querySelector('.solution').innerHTML += `<div class="step">
	<div class="sol">
		<div class="solver">
		Range:
		</div>

		<div class="solver">
			[<sub>${fa}</sub><sup>a</sup>${a},${b}<sup>b</sup><sub>${fb}</sub>]
		</div>
	</div>

	<div class="sol">
		<div class="solver">f '(x) = </div>
		<div class="solver">${der}</div>

	</div>

	<div class="sol">
	
		<div class="solver">
			x<sub>${it}</sub> = 
		</div>

		<div class="solver">
			x<sub>${it -1}</sub> -
		</div>
		<div class="solver">
			<div class="upper">
				<div id="a">f(x<sub>${it - 1 }</sub>)</div>
			</div>
			<div class="lower">
				<div id="a">f '(x<sub>${it - 1}</sub>)</div>
			</div>
		</div>

		<div class="solver">
		= ${sol}
		</div>

	</div>

	<div class="sol">
		<div class="solver">
			(x<sub>${it}</sub> - x<sub>${it - 1}</sub>) = 
		</div>

		<div class="solver">
			(${sol} - ${a})  = 
		</div>

		<div class="solver">
			${tol}
		</div>


	</div></div>`;
	it++;


}

var solver = 'x - (x^sin(2) - 4)/(sin(2) * x ^ (sin(2) - 1))';


function check(n){
	parser.set('x', n);
	return parser.evaluate(eq);
}

function checkR(a){
	math.parse('x');
	return math.evaluate(solver, { x: a });
}

function derivative(){
	let formatedEq = eq.replace(/sin\(/g, "sin");
	formatedEq = formatedEq.replace(/cos\(/g, "cos");
	formatedEq = formatedEq.replace(/tan\(/g, "tan");
	formatedEq = formatedEq.replace(/\)/g, "");
	//return formatedEq;
	let d = math.parse(formatedEq);
	let x = math.parse('x');
	return math.derivative(d, x);

}
