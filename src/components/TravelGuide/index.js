import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class TravelGuide extends Component {
  state = {isLoading: false, travelList: []}

  componentDidMount() {
    this.getTravelGuidePackages()
  }

  getTravelGuidePackages = async () => {
    this.setState({isLoading: true})

    const url = 'https://apis.ccbp.in/tg/packages'

    const response = await fetch(url)

    const data = await response.json()

    const updatedData = data.packages.map(eachPackage => ({
      description: eachPackage.description,
      id: eachPackage.id,
      imageUrl: eachPackage.image_url,
      name: eachPackage.name,
    }))
    console.log(updatedData)

    this.setState({isLoading: false, travelList: updatedData})
  }

  renderTravelPackages = () => {
    const {travelList} = this.state

    return (
      <ul className="ul-list">
        {travelList.map(eachPackage => (
          <li key={eachPackage.id} className="package-list">
            <img
              src={eachPackage.imageUrl}
              alt={eachPackage.name}
              className="image"
            />
            <h1 className="name">{eachPackage.name}</h1>
            <p className="description">{eachPackage.description}</p>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="bg-container">
        <h1 className="main-heading">Travel Guide</h1>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          this.renderTravelPackages()
        )}
      </div>
    )
  }
}

export default TravelGuide
