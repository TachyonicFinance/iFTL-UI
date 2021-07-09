import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { ethers } from 'ethers'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Fab from '@material-ui/core/Fab'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import { Uaddress, uabi } from './ABI/UChildAdministrableERC20'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    height: '100vh'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    backgroundColor: '#2F4F4F',
    color: 'white'
  },
  fabtitle: {
    flexGrow: 1,
    backgroundColor: '#2F4F4F',
    color: 'white',
    marginLeft: '10vw'
  },
  cardroot: {
    backgroundColor: '#2F4F4F',
    color: 'white',
    marginTop: theme.spacing(20),
    marginLeft: '10vw',
    width: '80vw',
    borderRadius: '20px'
  },
  cardbullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  cardtitle: {
    fontSize: 14,
    color: 'white'
  },
  cardpos: {
    marginBottom: 12,
    color: 'blue'
  },
  fabroot: {
    '& > *': {
      position: 'absolute',
      bottom: theme.spacing(10),
      right: theme.spacing(20),
      backgroundColor: '#2F4F4F',
      color: 'white',
      '&:hover': {
        backgroundColor: 'green'
      }
    }
  }
}))

export default function Major () {
  const classes = useStyles()
  const [error, setError] = useState(false)
  const [account, setAccount] = useState('')
  const [connectiontometamask, setConnectiontometamask] = useState(false)
  const infuraKey = 'acf106f341ed483a880225ada8964828'
  const data = require('./ABI/UChildAdministrableERC20.json')
  const depositdata = require('./ABI/YieldFarming.json')
  useEffect(() => {
    const metamaskInstalled = typeof window.web3 !== 'undefined'
    metamaskInstalled ? setError(false) : setError(true)
    console.log(metamaskInstalled)
    loadBlockchainData()
  }, [])
  const loadBlockchainData = async () => {
    // const web3 = new Web3(`https://polygon-mumbai.infura.io/v3/${infuraKey}`)
    // console.log(web3)
    // console.log(Web3)
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // console.log(provider)
    // const accounts = await provider.getBalance('ethers.eth')
    // console.log(accounts)
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
    console.log(web3)
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)

    accounts.length !== 0 ? setConnectiontometamask(true) : setConnectiontometamask(false)
  }
  const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      window.web3 = new Web3(window.ethereum)
      console.log(window.ethereum)
      window.ethereum !== 'undefined' ? setConnectiontometamask(true) : setConnectiontometamask(false)
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
      console.log(web3)
      const accounts = await web3.eth.getAccounts()
      console.log(accounts[0])
      setAccount(accounts[0])
      setConnectiontometamask(true)
      return true
    }
    return false
  }
  const increaseallowance = async () => {
    const web3 = new Web3(`https://polygon-mumbai.infura.io/v3/${infuraKey}`)
    console.log(web3)
    console.log(Web3)
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // console.log(provider)
    // const accounts = await provider.getBalance('ethers.eth')
    // console.log(accounts)

    console.log(data)
    console.log(data.address)
    console.log(account)
    // const Uaddress = ''
    // eslint-disable-next-line no-unused-vars
    const x = 0.01
    const y = ethers.utils.parseEther('0.0034')
    console.log(y)
    const increaseallowanceinit = new web3.eth.Contract(data.abi, data.address)
    const deposit = new web3.eth.Contract(depositdata.abi, depositdata.address)
    console.log(increaseallowanceinit)
    increaseallowanceinit.methods.increaseAllowance(account, y).call({ from: account }).then(function (result) {
      console.log(result)
      deposit.methods.deposit(y).call({ from: account }).then(function (result) {
        console.log(result)
      })
    })
    // accounts.length !== 0 ? setConnectiontometamask(true) : setConnectiontometamask(false)
  }
  return (
    <div className={classes.root}>
    <AppBar position="static" className={classes.title} >
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Logo
        </Typography>
        {connectiontometamask
          ? <Typography variant="h6" component="h2" className={classes.fabtitle}> connected to Metamask
          </Typography>
          : <Typography variant="h6" component="h2" className={classes.fabtitle}> Not connected to Metamask </Typography>
}
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
    <Card className={classes.cardroot} elevation={15}>
      <CardContent>
        <Typography className={classes.cardtitle} color="textSecondary" gutterBottom>
          Welcome
        </Typography>
       <Typography variant="h1" component="h2"> Coming Soon
          </Typography>
         </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    {error ? <SnackbarContent message="Please install Metamask ." /> : null}
    <div className={classes.fabroot}>
    {error
      ? null
      : <Fab variant="extended" onClick={() => ethEnabled()}>Connect To Metamask
      </Fab>}

    </div>
    <Fab variant="extended" onClick={() => increaseallowance()}>Increase Allowance
      </Fab>
  </div>
  )
}
