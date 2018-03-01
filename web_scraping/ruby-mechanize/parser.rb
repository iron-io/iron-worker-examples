require_relative 'bundle/bundler/setup'
require 'mechanize'

base_url = "http://1337x.to"
top_path = "top-100"

mechanize = Mechanize.new

page = mechanize.get("#{base_url}/#{top_path}")

array_of_torrents = []

page.search('div.table-list-wrap table tr').each do |row|
  hash = Hash.new

  row.search('td').each_with_index do |td, index|
    case index
      when 0
        torrent_link = td.search('a')[1]
        hash[:name] = torrent_link.text
        hash[:torrent_link] = "#{base_url}#{torrent_link[:href]}"
      when 1
        hash[:upload] = td.text
      when 2
        hash[:download] = td.text
      when 3
        hash[:date] = td.text
    end
  end
  array_of_torrents.push(hash)
end

p array_of_torrents
