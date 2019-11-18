const server = require('./service')
const request = require('supertest')

const originalDescribe = describe
describe = (name, fn) => originalDescribe(name, () => fn())

describe(`Webservice that only has one valid route: /calculator`, () =>
{
	//test(`Dispatcher appropriately handles errors`, () => request(server).get("crash").then(response => expect(!!response.error).toBe(true))),
	test(`/ returns nothing`, () =>
	{
		request(server).get("/").then(response =>
		{
			expect(response.text).toBe('')
		})
	}),
		
		test(`/<anything else> returns 404`, () =>
		{
			request(server).get("/test").then(response =>
			{
				expect(response.status).toBe(404)
			})
		})
})

describe(`Calculator class accessible through a web service`, () =>
{
	test(`Empty equations return NaN`, () =>
	{
		request(server).get("/calculator?equation=").then(response =>
		{
			expect(response.text).toBe('NaN')
		})
	}),
	
	test(`1 + 2 = 3`, () =>
	{
		request(server).get("/calculator?equation=1%20%2B%202").then(response =>
		{
			expect(response.text).toBe('3')
		})
	}),
	
	test(`1 - 2 = -1`, () =>
	{
		request(server).get("/calculator?equation=1%20-%202").then(response =>
		{
			expect(response.text).toBe('-1')
		})
	}),
	
	test(`2 * 3 = 6`, () =>
	{
		request(server).get("/calculator?equation=2%20%2A%203").then(response =>
		{
			expect(response.text).toBe('6')
		})
	}),
	
	test(`1 / 2 = .5`, () =>
	{
		request(server).get("/calculator?equation=1%20%2F%202").then(response =>
		{
			expect(response.text).toBe('0.5')
		})
	}),
	
	test(`1 + 5 - 6 = 0`, () =>
	{
		request(server).get("/calculator?equation=1%20%2B%205%20-%206").then(response =>
		{
			expect(response.text).toBe('0')
		})
	}),
	
	test(`6 - 6 + 10 = 10`, () =>
	{
		request(server).get("/calculator?equation=6%20-%206%20%2B%2010").then(response =>
		{
			expect(response.text).toBe('10')
		})
	}),
	
	test(`10 * 20 / 200 = 1`, () =>
	{
		request(server).get("/calculator?equation=10%20%2A%2020%20%2F%20200").then(response =>
		{
			expect(response.text).toBe('1')
		})
	}),
	
	test(`10 / 20 * 10 = 5`, () =>
	{
		request(server).get("/calculator?equation=10%20%2F%2020%20%2A%2010").then(response =>
		{
			expect(response.text).toBe('5')
		})
	}),
	
	test(`5 + 20 * 2 = 50`, () =>
	{
		request(server).get("/calculator?equation=5%20%2B%2020%20%2A%202").then(response =>
		{
			expect(response.text).toBe('50')
		})
	}),
	
	test(`100.5 - 20.5 / 2 = 40`, () =>
	{
		request(server).get("/calculator?equation=100.5%20-%2020.5%20%2F%202").then(response =>
		{
			expect(response.text).toBe('40')
		})
	}),
	
	test(`-2 * -10 + .5 = 20.5`, () =>
	{
		request(server).get("/calculator?equation=-2%20%2A%20-10%20%2B%20.5").then(response =>
		{
			expect(response.text).toBe('20.5')
		})
	}),
	
	test(`-1 + 20 = 19`, () =>
	{
		request(server).get("/calculator?equation=-1%20%2B%2020").then(response =>
		{
			expect(response.text).toBe('19')
		})
	}),
	
	test(`.5 * 10 = 5`, () =>
	{
		request(server).get("/calculator?equation=.5%20%2A%2010").then(response =>
		{
			expect(response.text).toBe('5')
		})
	}),
	
	test(`.2 / .2 = 1`, () =>
	{
		request(server).get("/calculator?equation=.2%20%2F%20.2").then(response =>
		{
			expect(response.text).toBe('1')
		})
	}),
	
	test(`1.5 + 2.5 = 4`, () =>
	{
		request(server).get("/calculator?equation=1.5%20%2B%202.5").then(response =>
		{
			expect(response.text).toBe('4')
		})
	})
})

// request(server).get('/calculator?equation=1%20%2B%201').expect(200).end((err) => {if (!err) console.log('Worked')})
// request(server).get('/calculator?equation=5%20%2B%205').expect(res => res.text === '10').then(console.log('Worked!'))