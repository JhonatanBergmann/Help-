import Help from '../models/Help'
import imagesView from './images_view'

export default {
    render(help: Help) {
        return {
            id: help.id,
            name: help.name,
            latitude: help.latitude,
            longitude: help.longitude,
            about: help.about,
            images: imagesView.renderMany(help.images)
        }
    },

    renderMany(help: Help[]) {
        return help.map(help => this.render(help))
    }
}