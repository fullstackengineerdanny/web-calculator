const url = require('url')
const http = require('http')
const calculator = new (require('./calculator'))
const dispatcher = new (require('httpdispatcher'))

const host = '127.0.0.1'
const port = process.env.PORT || 8080

dispatcher.onGet('/', (_, res) =>
{
	res.end('')
})

dispatcher.onGet('/calculator', (req, res) =>
{
	const parsedURL = url.parse(req.url)
	const search = parsedURL.search
	const decoded = decodeURIComponent(search)
	const eq = decoded.split('=')[1].trim()
	const result = calculator.evaluate(eq).toString()
	res.writeHead(200, {'Content-Type': 'text/html'})
	res.end(result)
})

dispatcher.onError((_, res) =>
{
	res.writeHead(404)
	res.end("Error: the URL doesn't exist")
})

const server = http.createServer((req, res) =>
{
	try
	{
		dispatcher.dispatch(req, res)
	}
	catch (error)
	{
		//console.log(error)
		throw new Error('')
	}
})

server.listen(port, host, () =>
{
	console.log(`Server running at http://${host}:${port}/`)
})

module.exports = server