#!/usr/bin/env node

"use strict";
var pjson = require('./package.json')

const RestaurantModule = require("./modules/restaurants")
const MenuModule = require('./modules/menu')

const parser = require('nomnom')

var pjson = require('./package.json')

parser
    .script(pjson.name)
    .option('query', {
        position: 0,
        help: 'search query for restaurant'
    })
    .option('help', {
        flag: true,
        abbr: 'h',
        help: 'show help'
    })
    .option('version', {
        flag: true,
        abbr: 'v',
        callback: () => {
            return pjson.version
        }
    })
    .option('week', {
        flag: true,
        abbr: 'w',
        help: 'output menus for the whole ongoing week'
    })
    .option('english', {
        flag: true,
        abbr: 'e',
        help: 'output the menus in english instead of finnish (BETA)'
    })
    .option('only-id', {
        flag: true,
        help: 'search only from restaurant ids'
    })
    .option('only-area', {
        flag: true,
        help: 'search only from restaurant area names'
    })
    .option('only-name', {
        flag: true,
        help: 'search only from restaurant names'
    })
    .option('restaurants', {
        flag: true,
        abbr: 'r',
        help: 'print a list of all the available restaurants',
        callback: function() {
            new RestaurantModule().print()
        }
    })

var opts = parser.parse()

if (!opts.restaurants) {
    new MenuModule(opts).print()
}
