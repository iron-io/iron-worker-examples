require_relative 'bundle/bundler/setup'
require 'twilio-ruby'
require 'iron_worker'

sid = IronWorker.payload["sid"]
token = IronWorker.payload["token"]
from = IronWorker.payload["from"]
to = IronWorker.payload["to"]
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