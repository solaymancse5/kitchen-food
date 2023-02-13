import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/Authprovider";

const Blog = () => {
	const { setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle("Blog | KitchenFood");
	}, []);
	return (
		<div>
			<article className="p-5 my-10">
				<h1 className="text-3xl">Difference between SQL and NoSQL</h1>
				<ol className="text-xl mt-5">
					<li>
						SQL pronounced as “S-Q-L” or as “See-Quel” is primarily called RDBMS
						or Relational Databases, whereas NoSQL is a Non-relational or
						Distributed Database.
					</li>
					<li>
						Comparing SQL vs NoSQL databases, SQL databases are table-based
						databases, whereas NoSQL databases can be document-based, key-value
						pairs, and graph databases.
					</li>
					<li>
						SQL databases are vertically scalable, while NoSQL databases are
						horizontally scalable.
					</li>
					<li>
						SQL databases have a predefined schema, whereas NoSQL databases use
						a dynamic schema for unstructured data.
					</li>
					<li>
						Comparing NoSQL vs SQL performance, SQL requires specialized DB
						hardware for better performance while NoSQL uses commodity hardware.
					</li>
				</ol>
			</article>

			<article className="p-5 my-10">
				<h1 className="text-3xl mb-5">What is JWT, and how does it work?</h1>
				<div className="text-xl">
					JWT or JSON Web Token, is an open standard used to share security
					information between two parties — a client and a server. Each JWT
					contains encoded JSON objects, including a set of claims. JWTs are
					signed using a cryptographic algorithm to ensure that the claims
					cannot be altered after the token is issued.
				</div>
				<div className="text-xl mt-5">
					JWTs differ from other web tokens in that they contain a set of
					claims. Claims are used to transmit information between two parties.
					What these claims are depends on the use case at hand. For example, a
					claim may assert who issued the token, how long it is valid for, or
					what permissions the client has been granted. A JWT is a string made
					up of three parts, separated by dots (.), and serialized using base64.
					In the most common serialization format, compact serialization, the
					JWT looks something like this: xxxxx.yyyyy.zzzzz. Once decoded, you
					will get two JSON strings: The header and the payload. The signature.
					The JOSE (JSON Object Signing and Encryption) header contains the type
					of token — JWT in this case — and the signing algorithm. The payload
					contains the claims. This is displayed as a JSON string, usually
					containing no more than a dozen fields to keep the JWT compact. This
					information is typically used by the server to verify that the user
					has permission to perform the action they are requesting. There are no
					mandatory claims for a JWT, but overlaying standards may make claims
					mandatory. For example, when using JWT as bearer access token under
					OAuth2.0, iss, sub, aud, and exp must be present. some are more common
					than others. The signature ensures that the token hasn’t been altered.
					The party that creates the JWT signs the header and payload with a
					secret that is known to both the issuer and receiver, or with a
					private key known only to the sender. When the token is used, the
					receiving party verifies that the header and payload match the
					signature.
				</div>
			</article>
			<article className="p-5 my-10">
				<h1 className="text-3xl mb-5">
					What is the difference between javascript and NodeJS?
				</h1>
				<div className="text-xl">
					Javascript is an implementation of ECMAScript, a standard defining the
					programming language. Browsers have a built-in interpreter for
					Javascript, along with a bunch of libraries and a run-time environment
					for working with web pages.
				</div>
				<div className="text-xl mt-5">
					Nodejs is an interpreter and environment for javascript which includes
					a bunch of libraries for using javascript as a general-purpose
					programming language, with an emphasis on asynchronicity and
					non-blocking operations. Node actually runs the same interpreter as
					Google Chrome (V8), but provides a different set of libraries and a
					different run-time environment. It also includes a package management
					system (NPM) and a few language extensions you won't find standard in
					browsers (for example modules).
				</div>
				<div className="text-xl mt-3">
					So tl;dr - the JS interpreter in Google Chrome and the JS interpreter
					in Nodejs are essentially the same. The difference is, in a browser
					your end goal is to modify stuff in a web page (text, graphics,
					stylesheets, etc), in Nodejs it's to run general purpose code that
					might do anything from running a web server to manipulating files.
				</div>
			</article>
			<article className="p-5 my-10">
				<h1 className="text-3xl mb-5">
					How does NodeJS handle multiple requests at the same time?
				</h1>
				<div className="text-xl">
					NodeJS server uses an EventQueue, which queues incoming client
					requests and an EventLoop which is an infinite loop that receives
					requests and processes them. This EventLoop is single threaded and
					acts as a listener for the EventQueue which processes incoming
					requests based on FIFO policy.
				</div>
				<div className="text-xl mt-5">
					When a new request comes in, NodeJS checks if it requires any blocking
					IO operations, if not, the EventLoop processes it and sends the
					response back to the client directly. If yes, then the request is
					forwarded to the thread manager, which then based on an algorithm,
					picks up an idle thread from the pool and lets it process the request.
					After completion of the request processing operation, the thread,
					returns the response back to the EventLoop which is then forwarded to
					the client. Thus, even if an incoming request needs blocking IO, the
					thread pool allows it to run asynchronously in the background without
					blocking the EventLoop and it gives a seamless experience of NodeJS
					handling multiple incoming requests concurrently without any
					persistent delays or bottlenecks.
				</div>
			</article>
		</div>
	);
};

export default Blog;
