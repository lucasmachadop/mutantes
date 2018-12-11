module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    modulePathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
    ],
    testURL:"http://localhost/"
}
