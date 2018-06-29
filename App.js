import React, { Component } from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, YellowBox, Button, TextInput, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from "./components/LoginScreen"
import { auth, db } from "./components/firebaseData"
import inGame from "./data/inGame"
import championData from "./data/championData"
import { SkillPointsUpdate } from "./components/SkillPointsUpdate"
import FirstColumn from "./components/firstColumn"
import SecondColumn from "./components/secondColumn"
import ThirdColumn from "./components/thirdColumn"
import { abilityUpdate } from "./components/abilityUpdate"
import {
  skillData,
  skillOrder,
  skillChampionMeta
} from "./data/skillData"
import FourthColumn from "./components/fourthColumn"
import InfoAbility from "./components/infoAbility"

YellowBox.ignoreWarnings(['Warning: isMounted(...)', 'Debugger and device', 'Remote debugger'])

class MainScreen extends Component {
  state = {
    messageHidden: "Search user to synchronize desktop app data and Riot ingame API data",
    isHidden: false,
    username: "",
    selectableChampions: false,
    allies: [null, null, null, null, null],
    enemies: [null, null, null, null, null],
    data: [[[],[[],[],[],[]],[]],[[],[[],[],[],[]],[]]],
    champions: {
      allyChampion: {
        id: false,
        level: false,
        spells: [false, false],
        SkillOrder: [],
        SkillPoints: [0,0,0,0],
        SkillData: [],
        currentHealth: 0,
        maxHealth: 0,
        currentMana: 0,
        maxMana: 0,
        mana_bar: 0,
        health_bar: 1,
        AP: 0,
        AD: 0,
        MR: 0,
        Armor: 0,
        ASP: 0,
        CDR: 0,
        Crit: 0 ,
        MS: 0,
        runes: [false, false, false, false, false, false],
        runesPage: [false, false],
        stats: {
          BaseMR: 0,
          BaseAD: 0,
          BaseHealth: 0,
          BaseArmor: 0,
          BaseMana: 0,
          BaseManaRegen: 0,
          BaseFlatMS: 0,
          LS: 0,
          SpellVamp: 0,
          MPen: 0,
          TouchUnique: 0,
          ASP: 0,
          BaseASP: 0,
          maxCrit: 2,
          lethality: 0,
          healAndShieldPower: 0
        },
        items: [false, false, false, false, false, false]
      },
      enemyChampion: {
        id: false,
        level: false,
        spells: [false, false],
        SkillOrder: [],
        SkillPoints: [0,0,0,0],
        SkillData: [],
        currentHealth: 0,
        maxHealth: 0,
        currentMana: 0,
        maxMana: 0,
        mana_bar: 0,
        health_bar: 1,
        AP: 0,
        AD: 0,
        MR: 0,
        Armor: 0,
        ASP: 0,
        CDR: 0,
        Crit: 0 ,
        MS: 0,
        runes: [false, false, false, false, false, false],
        runesPage: [false, false],
        stats: {
          BaseMR: 0,
          BaseAD: 0,
          BaseHealth: 0,
          BaseArmor: 0,
          BaseMana: 0,
          BaseFlatMS: 0,
          LS: 0,
          SpellVamp: 0,
          MPen: 0,
          ASP: 0,
          BaseASP: 0,
          maxCrit: 2,
          lethality: 0,
          healAndShieldPower: 0
        },
        items: [false, false, false, false, false, false]
      }
    }
  }
  static navigationOptions = ({ navigation }) => {

    return {
      headerRight: (
        <Button
          title="Sign Out"
          onPress={() => {
            auth.signOut()
            navigation.navigate('Login')
          }}
          color="black"
        />
      ),
      headerLeft: (
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Button
            title="Search user in game"
            onPress={() => {
              const searchUserInGame = navigation.getParam("searchUserInGame")
              searchUserInGame(navigation.getParam("username"))
            }}
            color="black"
          />
          <TextInput
            placeholder="Username..."
            onChangeText={navigation.getParam('writeUsername')}
            value={navigation.getParam("username")}
            width={200}
          />
        </View>
      ),
    };
  };

  updateEffects = () => {
    if (this.state.selectableChampions) {
      if (this.state.selectableChampions[this.state.champions.enemyChampion.id] !== undefined) {
        if (this.state.enemies.includes(this.state.champions.enemyChampion.id)) {
          const SkillPoints = SkillPointsUpdate(this.state.champions.enemyChampion.id, this.state.champions.enemyChampion.level, this.state.selectableChampions[this.state.champions.enemyChampion.id].SkillOrder)
          console.log(SkillPoints)
          const enemyChampion = Object.assign({}, this.state.champions.enemyChampion, {
            SkillOrder: this.state.selectableChampions[this.state.champions.enemyChampion.id].SkillOrder,
            SkillData: this.state.selectableChampions[this.state.champions.enemyChampion.id].SkillData,
            SkillPoints: SkillPoints,
            spells: [this.state.selectableChampions[this.state.champions.enemyChampion.id].spell1Id, this.state.selectableChampions[this.state.champions.enemyChampion.id].spell2Id],
            runes: this.state.selectableChampions[this.state.champions.enemyChampion.id].perks.perkIds,
            runesPage: [this.state.selectableChampions[this.state.champions.enemyChampion.id].perks.perkStyle, this.state.selectableChampions[this.state.champions.enemyChampion.id].perks.perkSubStyle]
          })
          const champions = Object.assign({}, this.state.champions, {
            enemyChampion: enemyChampion
          })
          this.setState({
            champions: champions
          },()=>{
            let stats = []
            for (const champ in this.state.champions) {
              let statObject = {}
              statObject.BaseMR = 0
              statObject.BaseAD = 0
              statObject.BaseHealth = 0
              statObject.BaseArmor = 0
              statObject.BaseMana = 0
              statObject.BaseFlatMS = 0
              statObject.LS = 0
              statObject.SpellVamp = 0
              statObject.MPen = 0
              statObject.ASP = 0
              statObject.BaseASP = 0
              statObject.maxCrit = 2
              statObject.lethality = 0
              statObject.healAndShieldPower = 0
              const Stats = championData.data[this.state.champions[champ].id].stats
              const Level = this.state.champions[champ].level
              statObject.BaseArmor += ((((0.0175*Level)+0.685)*(Level-1))*Stats["armorperlevel"])+Stats["armor"]
              statObject.BaseHealth += ((((0.0175*Level)+0.685)*(Level-1))*Stats["hpperlevel"])+Stats["hp"]
              statObject.BaseMR += ((((0.0175*Level)+0.685)*(Level-1))*Stats["spellblockperlevel"])+Stats["spellblock"]
              statObject.BaseAD += ((((0.0175*Level)+0.685)*(Level-1))*Stats["attackdamageperlevel"])+Stats["attackdamage"]
              statObject.ASP += ((((0.0175*Level)+0.685)*(Level-1))*(Stats["attackspeedperlevel"]/100))
              statObject.BaseASP += (0.625/(1+(Stats["attackspeedoffset"])))
              statObject.BaseMana += ((((0.0175*Level)+0.685)*(Level-1))*Stats["mpperlevel"])+Stats["mp"]
              statObject.BaseFlatMS += Stats["movespeed"]
              stats.push(statObject)
            }
            const allyChampion = Object.assign({}, this.state.champions.allyChampion, {
              stats: stats[0]
            })
            const enemyChampion = Object.assign({}, this.state.champions.enemyChampion, {
              stats: stats[1]
            })
            const champions = Object.assign({}, this.state.champions, {
              allyChampion: allyChampion,
              enemyChampion: enemyChampion
            })
            this.setState({
              champions: champions
            }, () => {
              const data = abilityUpdate(this.state.champions)
              this.setState({
                data: data
              },()=>{
                console.log(this.state)
              })
            })
          })
        }
        else {
          const data = Object.assign({}, this.state.data, {
            "1": [[],[[],[],[],[]],[]] 
          })
          const enemyChampion = Object.assign({}, this.state.champions.enemyChampion, {
            SkillOrder: [],
            SkillData: [],
            spells: [false,false],
            items: [false,false,false,false,false,false],
            runes: [false,false,false,false,false,false],
            runesPage: [false,false]
          })
          const champions = Object.assign({}, this.state.champions, {
            enemyChampion: enemyChampion
          })
          this.setState({
            data: data,
            champions: champions
          },()=>{
            console.log(this.state)
          })
        }
      }
    }
  }

  writeUsername = (e) => {
    this.setState({
      username: e
    }, ()=>{
      this.props.navigation.setParams({username: this.state.username})
    })
  }

  onFirebaseSnap = (data) => {
    const allyChampion = Object.assign({}, this.state.champions.allyChampion, { 
      items: [
        data.mine.items[0],
        data.mine.items[1],
        data.mine.items[2],
        data.mine.items[3],
        data.mine.items[4],
        data.mine.items[5]
      ],
      currentHealth: data.mine.currentHealth,
      maxHealth: data.mine.maxHealth,
      currentMana: data.mine.currentMana,
      maxMana: data.mine.maxMana,
      mana_bar: data.mine.mana_bar,
      health_bar: data.mine.health_bar,
      AP: data.mine.AP,
      AD: data.mine.AD,
      MR: data.mine.MR,
      Armor: data.mine.Armor,
      ASP: data.mine.ASP,
      CDR: data.mine.CDR,
      Crit: data.mine.Crit,
      MS: data.mine.MS,
      level: data.mine.level,
      SkillPoints: data.mine.skills
    })
    const enemyChampion = Object.assign({}, this.state.champions.enemyChampion, { 
      items: [
        data.enemy.items[0],
        data.enemy.items[1],
        data.enemy.items[2],
        data.enemy.items[3],
        data.enemy.items[4],
        data.enemy.items[5]
      ],
      currentHealth: data.enemy.currentHealth,
      maxHealth: data.enemy.maxHealth,
      currentMana: data.enemy.currentMana,
      maxMana: data.enemy.maxMana,
      mana_bar: data.enemy.mana_bar,
      health_bar: data.enemy.health_bar,
      AP: data.enemy.AP,
      AD: data.enemy.AD,
      MR: data.enemy.MR,
      Armor: data.enemy.Armor,
      ASP: data.enemy.ASP,
      CDR: data.enemy.CDR,
      Crit: data.enemy.Crit,
      MS: data.enemy.MS,
      level: data.enemy.level,
      id: data.enemy.champion
    })
    const champions = Object.assign({}, this.state.champions, { 
      allyChampion: allyChampion,
      enemyChampion: enemyChampion 
    })
    this.setState({
      champions: champions
    },()=>{
      this.updateEffects()
    })
  }

  searchUserInGame = (username) => {
    const inGameData = inGame
    for (const participant in inGameData.participants) {
      if (inGameData.participants[participant].summonerName == username) {
        this.setState({
          mineChampion: {
            teamId: inGameData.participants[participant].teamId,
            username: inGameData.participants[participant].summonerName
          }
        },()=>{
          const allies = []
          const enemies = []
          let champions = {}
          let selectableChampions = {}
          for (const participant in inGameData.participants) {
            champion = {}
            champion.championId = inGameData.participants[participant].championId
            champion.perks = inGameData.participants[participant].perks,
            champion.spell1Id = inGameData.participants[participant].spell1Id,
            champion.spell2Id = inGameData.participants[participant].spell2Id,
            champion.SkillOrder = skillOrder[skillChampionMeta[inGameData.participants[participant].championId][1]],
            champion.SkillData = skillData[skillChampionMeta[inGameData.participants[participant].championId][0]]
            selectableChampions[inGameData.participants[participant].championId] = champion
            if (inGameData.participants[participant].teamId == this.state.mineChampion.teamId) {
              allies.push(inGameData.participants[participant].championId)
            }
            else {
              enemies.push(inGameData.participants[participant].championId)
            }
            if (inGameData.participants[participant].summonerName == username) {
              const perks = inGameData.participants[participant].perks.perkIds
              const data = inGameData.participants[participant]
              const allyChampion = Object.assign({}, this.state.champions.allyChampion, {
                id: inGameData.participants[participant].championId,
                runes: [perks[0], perks[1], perks[2], perks[3], perks[4], perks[5]],
                spells: [data.spell1Id, data.spell2Id],
                runesPage: [data.perks.perkStyle, data.perks.perkSubStyle]
              })
              champions = Object.assign({}, this.state.champions, {
                allyChampion: allyChampion
              })
            }
          }
          this.setState({
            champions: champions,
            allies: allies,
            enemies: enemies,
            selectableChampions: selectableChampions
          },
          () => this.updateEffects())
        })
      }
    }
  }

  onDrop = (ord, enemy) => {
    console.log(ord, enemy)
    enemyObj = Object.assign({}, this.state.selectableChampions[enemy], {
      SkillOrder: ord
    })
    selectableChampions = Object.assign({}, this.state.selectableChampions, {
      [enemy]: enemyObj
    })
    const enemyChampion = Object.assign({}, this.state.champions.enemyChampion, {
      SkillOrder: ord
    })
    const champions = Object.assign({}, this.state.champions, {
      enemyChampion: enemyChampion
    })
    console.log(champions)
    console.log(selectableChampions)
    this.setState({
      selectableChampions: selectableChampions,
      champions: champions
    },()=>{
      this.updateEffects()
    })
  }

  changeAbilityHelpText = (text, effects) => {
    this.setState({
      messageHidden: effects + "\n" + text,
      isHidden: false
    })
  }

  componentWillMount() {
    this.props.navigation.setParams({ writeUsername: this.writeUsername, username: this.state.username, searchUserInGame: this.searchUserInGame});
    auth.onAuthStateChanged(firebase_user => {
      if (!firebase_user) {
          this.props.navigation.navigate('Login')
      }
      else {
        const userUID = firebase_user.uid
        db.ref().child("users").child(userUID).child("inGame").on("value", snap => {this.onFirebaseSnap(snap.val())})
        db.ref().child("users").child(userUID).child("username").once("value", snap => {
          this.props.navigation.setParams({username: snap.val()})
        })
      }
    }) 
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row", backgroundColor: "white" }}>
        <View style={{ flex: 1, borderColor: "black", borderWidth: 1, flexDirection: "column"}}>
          <View style={{ flex: .16, borderColor: "black", borderWidth: 1}}>
            <FirstColumn teamComp = {this.state.allies} selectedChampion = {this.state.champions.allyChampion}/>
          </View>
          <View style={{ flex: .14, borderColor: "black", borderWidth: 1}}>
            <SecondColumn stats={this.state.champions.allyChampion} enemyStats={this.state.champions.enemyChampion} side={"Ally"}/>
          </View>
          <View style={{ flex: .45, borderColor: "black", borderWidth: 1}}>
            <ThirdColumn data = {this.state.data[0]} stats = {this.state.champions.allyChampion} enemyStats = {this.state.champions.enemyChampion} changeAbilityHelpText = {this.changeAbilityHelpText.bind(this)} />
          </View>
          <View style={{ flex: .25, borderColor: "black", borderWidth: 1}}>
          </View>
        </View>
        <View style={{ flex: .025}}>
        </View>
        <View style={{ flex: 1, borderColor: "black", borderWidth: 1, flexDirection: "column"}}>
          <View style={{ flex: .16, borderColor: "black", borderWidth: 1}}>
            <FirstColumn teamComp = {this.state.enemies} selectedChampion = {this.state.champions.enemyChampion} side={"Enemy"}/>
          </View>
          <View style={{ flex: .14, borderColor: "black", borderWidth: 1}}>
            <SecondColumn stats={this.state.champions.enemyChampion} enemyStats={this.state.champions.allyChampion} side={"Enemy"}/>
          </View>
          <View style={{ flex: .45, borderColor: "black", borderWidth: 1}}>
            <ThirdColumn data = {this.state.data[1]} stats = {this.state.champions.enemyChampion} enemyStats = {this.state.champions.allyChampion} changeAbilityHelpText = {this.changeAbilityHelpText.bind(this)} />
          </View>
          <View style={{ flex: .25, borderColor: "black", borderWidth: 1}}>
            <FourthColumn skillOrder={this.state.champions.enemyChampion.SkillOrder} skillData={this.state.champions.enemyChampion.SkillData} enemy={this.state.champions.enemyChampion.id} onDrop = {this.onDrop.bind(this)}/>
          </View>
        </View>
        <InfoAbility hide={this.state.isHidden} style={{position: "absolute", left: 0, right: 0, top: 0, bottom: 0, alignItems: "center"}}>
          <View style={{backgroundColor: "white", borderColor: "black", borderWidth: 2, width: "80%", borderRadius: 5, flexDirection: "row"}}>
            <View style={{flex: .9, paddingLeft: 2, paddingRight: 2, paddingTop: 5, paddingBottom: 5}}>
              <Text style={{textAlign: "center"}}>{this.state.messageHidden}</Text>
            </View>
            <View style={{flex: .1}}>
              <TouchableHighlight style={{flex: 1, alignItems: "center", borderRadius: 5, margin: 5, justifyContent: "center"}} underlayColor={"rgba(200,200,200, .5)"} onPress={() => {this.setState({isHidden: true})}}>
                <Text style={{textAlign: "center"}}>X</Text>
              </TouchableHighlight>
            </View>
          </View>
        </InfoAbility>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Main: MainScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Main',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}