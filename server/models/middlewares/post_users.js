/***** POST HOOKS ****/

/**
 * Delete user dependant documents in other collections.
 * @param {Object} doc - the user document (which is deleted)
 */
module.exports.afterUserDelete = function (doc) {
  const queryObj = { user_id: doc._id };

  console.log('\n\n------ POST MIDDLEWARE afterUserDelete() ------');

  doc.model('productsMD').deleteMany(queryObj)
    .then(result => {
      console.log('productsMD', result.deletedCount); // {"ok": 1,"n": 0}
      return result;
    });

};



