
p = 11;
n1 = 80000;
n2 = 75;

function coin_flip(){
	return ( Math.floor( 2 * Math.random() ) )
}

function dice_roll(){
	return ( Math.floor( 6 * Math.random() ) + 1)
}

function n_dice_roll(n){
	return ( Math.floor( n * Math.random() ) + 1);
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

//Problem6
// In Las Vegas, a roulette wheel has 38 slots numbered 0, 00, 1, 2, . . . , 36. The 0 and 00 slots are green and half of the remaining 36 slots are red and half are black. A croupier spins the wheel and throws in an ivory ball. If you bet 1 dollar on red, you win 1 dollar if the ball stops in a red slot and otherwise you lose 1 dollar. Write a program to find the total winnings for a player who makes 1000 bets on red.

if ( p==6 ){
	sum = 0;
	for ( var a=0; a<100; a++){
		winnings = 0;
		for ( var i=0; i<1000; i++){
			var roll = n_dice_roll(38);
			if(roll <= 18){
				winnings ++;
			}
			else{
				winnings --;
			}
		}
		sum += winnings
	}
	var avg = sum/100;
	console.log("The avg winnings for red on roulette is: " + avg);
	//-50 is the average "Winnings". Yes, lets play roullete!!!!!
}


//Problem7
//Another form of bet for roulette is to bet that a specific number (say 17) will turn up. If the ball stops on your number, you get your dollar back plus 35 dollars. If not, you lose your dollar. Write a program that will plot your winnings when you make 500 plays of roulette at Las Vegas, first when you bet each time on red (see Exercise 6), and then for a second visit to Las Vegas when you make 500 plays betting each time on the number 17. What differences do you see in the graphs of your winnings on these two occasions?

if ( p==7 ){
	sum = 0;
	for ( var a=0; a<5000000; a++){
		winnings = 0;
		for ( var i=0; i<1000; i++){
			var roll = n_dice_roll(38);
			if(roll == 17){
				winnings +=35;
			}
			else{
				winnings --;
			}
		}
		sum += winnings
	}
	var avg = sum/5000000;
	console.log("The avg winnings for 17 on roulette is: " + avg);
	//-50 is the average "Winnings". Yes, lets play roullete!!!!!
}

//Problem8: NOT FINISHED
//An astute student noticed that, in our simulation of the game of heads or tails (see Example 1.4), the proportion of times the player is always in the lead is very close to the proportion of times that the player’s total winnings end up 0. Work out these probabilities by enumeration of all cases for two tosses and for four tosses, and see if you think that these probabilities are, in fact, the same.

//Intersting problem. I want to enumerate do this for n tosses.
function check_cases(cases){
	case_data = []
	for (var i in cases){
		var always_winning = true;
		var score = 0;
		for (var j in cases[i]){
			var d = cases[i][j];
			if(d == "1"){
				score ++;
			}
			else{
				score --;
			}
			if(score<0){
				//He is always winning even with a score 0 AS LONG as he never goes below 0 at any instant
				always_winning = false;
			}
		}	
		case_data.push({always_winning:always_winning, enumerate:cases[i], score:score});
	}
	return case_data
}

if ( p==8 ){
	var cases = [];
	n = 4;
	for ( var i=0; i<Math.pow(n,2); i++){
		var enumerate = i.toString(2);
		var prepend = ""
			for (var j=0; j<=n.toString(2).length-enumerate.length; j++){
				prepend += "0"
			}
		cases.push(prepend + enumerate);
	}

	case_data = check_cases(cases);
	//do something with case data
	always_winning = 0;
	score_is_zero  = 0;
	for( var i in case_data){
		//count always in lead 
		if(case_data[i]['always_winning'])always_winning ++;	

		//count score is zero
		if(case_data[i]['score'] == 0) score_is_zero ++;
	}
	console.log("Always winning proportion is: " + always_winning/case_data.length)
	console.log("0 score proportion is: " + score_is_zero/case_data.length)
	//Yes, it holds for 4, but not for larger numbers as far as I can tell
}


//The Labouchere system for roulette is played as follows. Write down a list of numbers, usually 1, 2, 3, 4. Bet the sum of the first and last, 1+4 = 5, on red. If you win, delete the first and last numbers from your list. If you lose, add the amount that you last bet to the end of your list. Then use the new list and bet the sum of the first and last numbers (if there is only one number, bet that amount). Continue until your list becomes empty. Show that, if this happens, you win the sum, 1 + 2 + 3 + 4 = 10, of your original list. Simulate this system and see if you do always stop and, hence, always win. If so, why is this not a foolproof gambling system?

if ( p==9 ){
	var winnings = 0;
	var maximum = 0;
	labouchere = [1, 2, 3, 4, 5];
	sum = 0;
	for ( var i=0; i<labouchere.length; i++ ){
		sum += labouchere[i];
	}
	iterations = 0;
	while(true){//Around and around it goes, where it stops, nobody knows!!!! Programming roulette pun :)
		iterations ++;
		if (labouchere.length == 0)break;
		else{
			var bet = labouchere[0] + labouchere[labouchere.length-1];
			if(bet>maximum) maximum = bet
			var roll = n_dice_roll(38);
			if(roll <= 18){
				winnings += bet;		
				labouchere = labouchere.slice(1, labouchere.length-1);     //Remove last and first

			}
			else{
				winnings -= bet;		
				labouchere.push(bet);
			}

		}
	}
	console.log("After " + iterations + " iterations")
	console.log("You won " + winnings + " dollars");
	console.log("with the sum of your list being " + sum);
	console.log("and a maximum be of " + maximum);
	console.log("even though you always win...");
	console.log("run this enough times and see why your still a loser");
}

//Another well-known gambling system is the martingale doubling system. Sup- pose that you are betting on red to turn up in roulette. Every time you win, bet 1 dollar next time. Every time you lose, double your previous bet. Con- tinue to play until you have won at least 5 dollars or you have lost more than 100 dollars. Write a program to simulate this system and play it a number of times and see how you do. In his book The Newcomes, W. M. Thack- eray remarks “You have not played as yet? Do not do so; above all avoid a martingale if you do.”10 Was this good advice?
//
//

if ( p==10 ){

	//Simulate 100000 times
	var times_won = 0;
	for( var i=0; i<100000; i++ ){	
		var winnings = 0;
		var bet = 1;
		while(winnings >= -100 && winnings <= 5){
			var roll = n_dice_roll(38);
			if( roll<=18 ){
				winnings += bet;
			}else{
				winnings -= bet;
				bet *= 2;
			}
		}
		if(winnings > 0){
			times_won++;
		}
	}
	console.log("Prob of winning: " + times_won/100000);
	console.log("Prob of winning * 5: " + times_won/100000 * 5 +" ....vs....Prob of losing * 100: " + (1-(times_won/100000)) * 100);
	console.log("Look at expected winnings. Do not play!");
}

//Modify the program HTSimulation so that it keeps track of the maximum of Peter’s winnings in each game of 40 tosses. Have your program print out the proportion of times that your total winnings take on values 0, 2, 4, . . . , 40. 
if ( p==11 ){
	
	winning_array = [];
	for( var n=0; n<100000; n++ ){
		winnings = 0;
		for( var i=0; i<40; i++ ){
			toss = coin_flip();
			if( toss == 1 ){
				winnings ++;
			}else{
				winnings --;
			}
		}	
		winning_array.push(winnings);
	}
	console.log(winning_array);
	var proportions = []
	for( var i=0; i<=20; i++ ){
		proportions[i] = 0;	
	}
	for( var i in winning_array ){
		if(winning_array[i]%2==0){
			proportions[winning_array[i]/2]++;
		}
	}
	for( var i=0; i<20; i++ ){
		proportions[i] *= (1/100000);
		console.log("i:" + i*2 + ": proportion " + proportions[i]);
	}
}
