class Greeter {
	saySomething(message: string = "Hello") {
		return message + ' world';
	}
}

var greeter = new Greeter();
greeter.saySomething('hiya');