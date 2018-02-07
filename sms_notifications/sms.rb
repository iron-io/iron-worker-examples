require_relative 'bundle/bundler/setup'
require 'twilio-ruby'
require 'iron_worker'

# read all required parameters from payload
sid = IronWorker.payload["sid"]         # twilio account sid
token = IronWorker.payload["token"]     # twilio auth token
from = IronWorker.payload["from"]       # your twilio number
to = IronWorker.payload["to"]           # your phone number
body = IronWorker.payload["body"]

# set up a client to talk to the Twilio REST API
@client = Twilio::REST::Client.new sid, token

puts "Sending sms..."
r = @client.messages.create(
    :from => from,
    :to => to,
    :body => body
)

puts "Twilio response:"
p r