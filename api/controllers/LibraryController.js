/**
 * LibraryController
 *
 * @description :: Server-side logic for managing libraries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  uploadLibraryImage: function(id, req, res) {},

  create: function(req, res) {
    req.file("image").upload(
      {
        // don't allow the total upload size to exceed ~15MB
        maxBytes: 15000000
      },
      function whenDone(err, uploadedFiles) {
        if (err) {
          return res.negotiate(err);
        }

        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0) {
          return res.badRequest("No file was uploaded");
        }

        // TODO: Should create a thumbnail image at some point
        var gm = require("gm");
        var path = uploadedFiles[0].fd.replace(".jpg", ".thumb.jpg");
        gm(uploadedFiles[0].fd).thumb(200, 200, path, 100, function(err) {
          console.log(err);
          var params = req.params.all();
          Library.create(
            {
              ...params,
              libraryFd: uploadedFiles[0].fd,
              thumbFd: path
            },
            function(err, createdData) {
              if (err) {
                return res.badRequest({
                  error: err,
                  req: req.params.all()
                });
              }

              return res.ok();
            }
          );
        });
      }
    );
  },

  getImage: function(req, res) {
    Library.findOne(req.param("id")).exec(function(err, library) {
      if (err) return res.serverError(err);
      if (!library) return res.notFound();

      if (!library.libraryFd) {
        return res.notFound();
      }

      var SkipperDisk = require("skipper-disk");
      var fileAdapter = SkipperDisk();

      res.set(
        "Content-disposition",
        "attachment; filename='" + "library" + "'"
      );

      fileAdapter
        .read(library.libraryFd)
        .on("error", function(err) {
          return res.serverError(err);
        })
        .pipe(res);
    });
  }
};
