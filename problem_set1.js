
p = 18;
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

//In an upcoming national election for the President of the United States, a pollster plans to predict the winner of the popular vote by taking a random sample of 1000 voters and declaring that the winner will be the one obtaining the most votes in his sample. Suppose that 48 percent of the voters plan to vote for the Republican candidate and 52 percent plan to vote for the Democratic candidate. To get some idea of how reasonable the pollster’s plan is, write a program to make this prediction by simulation. Repeat the simulation 100 times and see how many times the pollster’s prediction would come true. Repeat your experiment, assuming now that 49 percent of the population plan to vote for the Republican candidate; first with a sample of 1000 and then with a sample of 3000. (The Gallup Poll uses about 3000.) (This idea is discussed further in Chapter 9, Section 9.1.)

if ( p == 12 ){

	var poll = function(p_dem, sample_size){
		d_win = 0;
		r_win = 0;
		n12 = 100;

		for( var n=0; n<n12; n++ ){
			var d = 0;
			var r = 0;
			for( var i=0; i<sample_size; i++ ){
				if(Math.random() <= p_dem){
					d++;
				}else{
					r++;
				}
			}
			if(d>r){
				d_win++;
			}else{
				r_win++;
			}
		}
		proportion_correct = d_win/n12;
		console.log("With a sample size of "+ sample_size +", the sample calculated correctly " +  proportion_correct * 100 + "% of the time");
	}

	//part a
	poll(.52, 1000);
	//part b
	poll(.51, 1000);
	//part c
	poll(.51, 3000);

}

//The psychologist Tversky and his colleagues say that about four out of five people will answer (a) to the following question:
//A certain town is served by two hospitals. In the larger hospital about 45 babies are born each day, and in the smaller hospital 15 babies are born each day. Although the overall proportion of boys is about 50 percent, the actual proportion at either hospital may be more or less than 50 percent on any day. At the end of a year, which hospital will have the greater number of days on which more than 60 percent of the babies born were boys?
//(a) the large hospital
//(b) the small hospital
//(c) neither—the number of days will be about the same.
//Assume that the probability that a baby is a boy is .5 (actual estimates make this more like .513). Decide, by simulation, what the right answer is to the question. Can you suggest why so many people go wrong?


if ( p == 13 ){

	var x = 0;
	while(true){
	var n13 = 365;
	var small_win = 0;
	var large_win = 0;
	for ( var i=0; i<n13; i++ ){
		small_babies = 15;
		small_b = 0;
		large_babies = 45;
		large_b = 0;	
		for ( var j=0; j<small_babies; j++ ){
			if(Math.random() <=.5){
				small_b++;
			}
		}
		for ( var j=0; j<large_babies; j++ ){
			if(Math.random() <=.5){
				large_b++;
			}
		}
		small_percent = small_b/small_babies;
		large_percent = large_b/large_babies;
		if (small_percent > .6){
			small_win++;
		}
		if (large_percent > .6){
			large_win++;
		}
	}
	if(small_win<large_win){
		console.log("Game OVER");
	}
	else{
		console.log(x);
	}
	x++;
	}
}


//Tversky and his colleagues12 studied the records of 48 of the Philadelphia 76ers basketball games in the 1980–81 season to see if a player had times when he was hot and every shot went in, and other times when he was cold and barely able to hit the backboard. The players estimated that they were about 25 percent more likely to make a shot after a hit than after a miss. In fact, the opposite was true—the 76ers were 6 percent more likely to score after a miss than after a hit. Tversky reports that the number of hot and cold streaks was about what one would expect by purely random effects. Assuming that a player has a fifty-fifty chance of making a shot and makes 20 shots a game, estimate by simulation the proportion of the games in which the player will have a streak of 5 or more hits.
if ( p == 15 ){
	
	n15 = 100000;
	var total_streak5=0;
	for ( var i=0; i<n15; i++ ){
		var current_streak = 0;
		var streak5 = false;
		var prob = .5;
		var shots_made = 0;

		while(shots_made != 20){
			if( Math.random() <= prob ){
				shots_made++;
				current_streak++;
				prob = .5;
			}else{
				current_streak = 0;
				prob = .56;
			}
			if(current_streak >= 5){
				streak5 = true;
			}
		}
		if(streak5){total_streak5++;}
	}

	console.log(total_streak5);
	var proportion = total_streak5/n15;
	console.log("Simulated proportion:" + proportion);

	//The raised chance after a miss does nothing for the probability of streaks
}


//Estimate, by simulation, the average number of children there would be in a family if all people had children until they had a boy. Do the same if all people had children until they had at least one boy and at least one girl. How many more children would you expect to find under the second scheme than under the first in 100,000 families? (Assume that boys and girls are equally likely.)

if ( p == 16 ){

	n16=1000000;
	var ctot=0;
	var c2tot=0;
	for ( var n=0; n<n16; n++ ){

		var b = 0;
		var g = 0;
		var b_2 = 0;
		var g_2 = 0;

		while ( b<1 || g<1 ){
			if(Math.random() <= .5){b++;}
			else{g++;}
		}

		while ( b_2<1 ){
			if(Math.random() <= .5){b_2++;}
			else{g_2++;}
		}

		ctot += b + g;
		c2tot += b_2 + g_2;
	}	
	console.log("Average kids if trying for a boy and a girl = " + ctot/n16);
	console.log("Average kids if trying for just a boy = " + c2tot/n16);

}

// Write a program to simulate a random walk in one dimension starting at 0. Have your program print out the lengths of the times between returns to the starting point (returns to 0). See if you can guess from this simulation the answer to the following question: Will the walker always return to his starting point eventually or might he drift away forever?

if ( p == 17){
	n17 = 1000;
	tot_steps=0;

	for ( var n=0; n<n17; n++ ){
		
		var pos = 0;
		var steps = 0;

		do{
			if(Math.random() <= .5){
				pos += 1;
			}else{
				pos -= 1;
			}
			steps++;
		}while(pos!= 0)
		console.log("Trial #"+ n + " : " + steps);
		tot_steps += steps;
	}
	console.log("The average steps over " + n17 + " trials is: " + tot_steps/n17);
}
// They always return, but it sometimes takes a while


//The paths of two walkers in two dimensions who meet after n steps can be considered to be a single path that starts at (0, 0) and returns to (0, 0) after 2n steps. This means that the probability that two random walkers in two dimensions meet is the same as the probability that a single walker in two dimensions ever returns to the starting point. Thus the question of whether two walkers are sure to meet is the same as the question of whether a single walker is sure to return to the starting point.
//Write a program to simulate a random walk in two dimensions and see if you think that the walker is sure to return to (0, 0). If so, Po ́lya would be sure to keep meeting his friends in the park. Perhaps by now you have conjectured the answer to the question: Is a random walker in one or two dimensions sure to return to the starting point? Po ́lya answered this question for dimensions one, two, and three. He established the remarkable result that the answer is yes in one and two dimensions and no in three dimensions.


if ( p == 18){
	n18 = 10000;
	tot_steps=0;

	for ( var n=0; n<n18; n++ ){
		
		var pos = [0,0];
		var steps = 0;

		do{
			dim = ( Math.floor( 2 * Math.random() ) )
			if(Math.random() <= .5){
				pos[dim] += 1;
			}else{
				pos[dim] -= 1;
			}
			steps++;

		}while( pos[0]!=0 || pos[1]!=0 )
		console.log("Trial #"+ n + " : " + steps);
		tot_steps += steps;
	}
	console.log("The average steps over " + n18 + " trials is: " + tot_steps/n18);
}//I Get that it wont work!!!!

