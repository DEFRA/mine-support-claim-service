const claimRepository = require('../repository/claim-repository')
const mineTypeRepository = require('../repository/minetype-repository')
const messageService = require('../services/message-service')

module.exports = {
  create: async function (claim) {
    const existingClaim = await claimRepository.getById(claim.claimId)
    if (existingClaim != null) {
      return existingClaim
    }

    const claimRecord = await claimRepository.create(claim)

    if (claim.mineType != null) {
      claim.mineType.forEach(type => {
        mineTypeRepository.create(claim.claimId, type)
      })
    }

    await messageService.publishClaim(claim)

    return claimRecord
  }
}
