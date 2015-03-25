
p = 5;
n1 = 80000;
n2 = 75;

function coin_flip(){
	return ( Math.floor( 2 * Math.random() ) )
}

function dice_roll(){
	return ( Math.floor( 6 * Math.random() ) + 1)
}

//Problem1
//1 Modify the program CoinTosses to toss a coin n times and print out after every 100 tosses the proportion of heads minus 1/2. Do these numbers appear to approach 0 as n increases? Modify the program again to print out, every 100 times, both of the following quantities: the proportion of heads minus 1/2, and the number of heads minus half the number of tosses. Do these numbers appear to approach 0 as n increases?
if( p==1 ){
	var h = 0;
	for( var n=0; n<n1; n++ ){
		h += coin_flip()
		if( n%100 == 0 ){
			proportion = (h/n) - .5;
			h_minus_half = (h - ( .5 * n ));
			console.log("(h/n - .5) = " + proportion);
			console.log("(h - n/2) = " + h_minus_half);
			console.log("\n");
		}
	}
	//Answer: The heads minus .5 does not approach 0
}

//Problem2
//Modify the program CoinTosses so that it tosses a coin n times and records whether or not the proportion of heads is within .1 of .5 (i.e., between .4 and .6). Have your program repeat this experiment 100 times. About how large must n be so that approximately 95 out of 100 times the proportion of heads is between .4 and .6?
if( p==2 ){
	var wins = 0;
	for( var ex=0; ex<100; ex++ ){
		var h = 0;
		for( var n=0; n<n2; n++ ){
			h += coin_flip()
		}
		proportion = h/n;
		console.log("(h/n) = " + proportion );
		console.log("\n");
		if(proportion >= .4 && proportion <= .6){
			wins++;
		}
	}
	console.log("You won " + wins + "/100 times");
	//Answer: Roughly n = 75 ;
}


//Problem3
//In the early 1600s, Galileo was asked to explain the fact that, although the number of triples of integers from 1 to 6 with sum 9 is the same as the number of such triples with sum 10, when three dice are rolled, a 9 seemed to come up less often than a 10—supposedly in the experience of gamblers.
//a) Write a program to simulate the roll of three dice a large number of times and keep track of the proportion of times that the sum is 9 and the proportion of times it is 10.
//
//(b) Can you conclude from your simulations that the gamblers were correct?
//
if( p==3 ){
	var n3 = 100000;
	var nines = 0;
	var tens = 0;
	for( var n=0; n<n3; n++ ){
		var sum = 0;
		var rolls = [];
		for( var r=0; r<3; r++ ){
			rolls[r] = dice_roll()	
			sum += rolls[r];
		}
		if(sum == 9)nines++;
		if(sum == 10)tens++;
	}
	console.log("Proportion of nines: " + nines/n3);
	console.log("Proportion of tens: " + tens/n3);
	//Answer: They are correct: Nines:.1165, Tens:.125
	//Count the number of ways to achieve the various dice rolls (aka seperate rolls by sum and then get duplicates out. count the resulting "set")
	//Hints: 9 has 25 ways to win, 10 has 27 ways to win
}

//Problem4
// In raquetball, a player continues to serve as long as she is winning; a point is scored only when a player is serving and wins the volley. The first player to win 21 points wins the game. Assume that you serve first and have a probability .6 of winning a volley when you serve and probability .5 when your opponent serves. Estimate, by simulation, the probability that you will win a game.
if( p ==4 ){
	var n4 = 100000;
	var me = 0;
	var u = 0;
	for( var n = 0; n<n4; n++ ){
	s = "me";
	p_m = .6;
	p_u = .5;
	score_m = 0;
	score_u = 0;

	while (score_m != 21 && score_u != 21){
		if (s == "me"){
			if(Math.random()<=.6){score_m++;}
			else{score_u++;}
		}else{
			if(Math.random()<=.5){score_m++;}
			else{score_u++;}
		  
		}
	}
	if(score_m == 21 && score_u == 21){console.log("zeus strikes you with an imposible thunderbolt?")}
	else if(score_m == 21){me++;}
	else if(score_u == 21){u++;}
	}
	console.log(me/n4);
	//Answer .90ish
}


//Problem5
//Consider the bet that all three dice will turn up sixes at least once in n rolls of three dice. Calculate f(n), the probability of at least one triple-six when three dice are rolled n times. Determine the smallest value of n necessary for a favorable bet that a triple-six will occur when three dice are rolled n times. (DeMoivre would say it should be about 216 log 2 = 149.7 and so would answer 150—see Exercise 1.2.17. Do you agree with him?)
if ( p==5 ){
	text = [];
	p1 = (1/6 * 1/6 * 1/6)
	t = "1/6 * 1/6 * 1/6 = " + p1;
	text.push(t);
	pn = function(n){
		p2 = (1 -  p1); //Probability that 6's aren't rolled
		console.log(n)
		inverse_answer =  Math.pow(p2, n); //The probability that 6's arent rolled after n times
		return 1-inverse_answer;

	}
	n = 1;
	p = 0;
	while(p<=.5){
		p = pn(n);
		n++;
	}
	console.log(n);
	//Function is: f(n) = 1-((1-(1/6*1/6*1/6))^n);
	//No I get 151!
}

