const skillData = {
    "NoUdyr": {
        0: {
            text: 'Q',
        },
        1: {
            text: 'W',
        },
        2: {
            text: 'E',
        }
    },
    "Udyr": {
        0: {
            text: 'Q',
        },
        1: {
            text: 'W',
        },
        2: {
            text: 'E',
        },
        3: {
            text: 'R',
        }
    }
}

const skillOrder = {
    "QWE": ["0","1","2"],
    "QEW": ["0","2","1"],
    "WQE": ["1","0","2"],
    "WEQ": ["1","2","0"],
    "EWQ": ["2","1","0"],
    "EQW": ["2","0","1"]
}

const skillChampionMeta = {
    "1": ["NoUdyr", "QWE"],
    "25": ["NoUdyr", "QEW"],
    "141": ["NoUdyr", "QWE"],
    "157": ["NoUdyr", "QEW"],
    "27": ["NoUdyr", "QEW"],
    "236": ["NoUdyr", "QEW"],
    "42": ["NoUdyr", "QEW"],
    "64": ["NoUdyr", "QWE"],
    "25": ["NoUdyr", "QEW"],
    "267": ["NoUdyr", "WEQ"],
    "43": ["NoUdyr", "QEW"],
    "67": ["NoUdyr", "QWE"],
}

export {
    skillData,
    skillOrder,
    skillChampionMeta
}