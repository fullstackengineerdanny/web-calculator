module.exports = class Calculator
{
	constructor()
	{
		this.value = 0
	}

	evaluate(equation)
	{
		if (!equation) return NaN

		let tokens = equation.split(' ').reverse()

		this.value = Number(tokens.pop())

		// Iterator is being modified consciously
		// This simple implementation guarantees correct input, so it's a safe modification in this context
		while (tokens.length > 0)
		{
			switch (tokens.pop())
			{
				case '+': this.value += Number(tokens.pop())
				break
				case '-': this.value -= Number(tokens.pop())
				break
				case '*': this.value *= Number(tokens.pop())
				break
				case '/': this.value /= Number(tokens.pop())
				break
			}
		}

		return this.value
	}
}