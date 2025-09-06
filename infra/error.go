package infra

import "github.com/pkg/errors"

var errQueryFailed = errors.New("An error has occure in db query")
var errMapRows = errors.New("An error has occure while mapping rows")
