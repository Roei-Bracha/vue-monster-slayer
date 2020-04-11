new Vue(
    {
        el: "#app",
        data: {
            playerLife: 100,
            monsterLife: 100,
            gameIsRunning: false,
            eventLog:[]
        },
        methods: {
            newGame: function() {
                this.playerLife = 100
                this.monsterLife = 100
                this.gameIsRunning = true
                this.eventLog = []
            },
            attack: function (special = false) {
                let max,min
                if (special) {
                    max = 20
                    min = 10
                }
                else {
                    max = 10
                    min = 3
                }
                const playerDam  = this.calculateDamage(min, max)
                this.monsterLife -= playerDam
                this.logEvent(true,'attack with ' + playerDam)
                this.checkWin()
                if (this.gameIsRunning) {
                    const monsterDam = this.calculateDamage(5, 12)
                    this.playerLife -= monsterDam
                    this.logEvent(false,'attack with ' + monsterDam)
                    this.checkWin()
                }
            },
            heal: function () {
                if(this.playerLife < 90)
                    this.playerLife += 10
                else
                    this.playerLife = 100
                this.logEvent(true,'player healed himself')
                const monsterDam = this.calculateDamage(5, 12)
                this.playerLife -= monsterDam
                this.logEvent(false,'attack with ' + monsterDam)
                this.checkWin()
            },
            calculateDamage: function (min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            },
            checkWin: function () {
                if (this.monsterLife <= 0) {
                    this.monsterLife=0
                    if (confirm("You won! want to play another game?")) {
                        this.newGame()
                    }
                    else {
                        this.gameIsRunning = false
                    }
                }
                else if (this.playerLife <= 0) {
                    this.playerLife=0
                    if (confirm("You Lose! want to play another game?")) {
                        this.newGame()
                    }
                    else {
                        this.gameIsRunning = false
                    }
                }
            },
            logEvent: function (isPlayer, info) {
                this.eventLog.push({isPlayer,info})
            }
        }
    }
)


