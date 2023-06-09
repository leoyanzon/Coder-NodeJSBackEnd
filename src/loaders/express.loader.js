const express = require('express');
const compression = require('compression');
const cors = require('cors');

const path = require('path')

const config = require('../loaders/config.loader')();

const expressLoader = ( app ) => {
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    if (config.server.ENVIRONMENT == 'development') app.use(cors());
        
    app.set('view engine', 'ejs');
    app.set('views', './views');
    app.use(express.static(path.join(__dirname, '../../public')));
    
    app.use('/uploads', express.static('tmp/images'));

    return app;
}

module.exports = expressLoader;