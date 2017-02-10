module.exports = function jekyll(renderDocsProcessor) {
  return {
    name: 'readmes',
    description: 'Create jekyll includes',
    $runAfter: ['paths-computed'],
    $runBefore: ['rendering-docs'],
    $process: function(docs) {
      var currentVersion = renderDocsProcessor.extraData.version.current.name;

      // pretty up and sort the docs object for menu generation
      docs = docs.filter(function(doc) {
        return (!!doc.name && !!doc.outputPath) || doc.docType === 'index-page';
      });

      docs.forEach(function(doc, i) {
        doc.npmId = doc.outputPath.replace('/README.md', '');
      });

      // returning docs will replace docs object in the next process
      return docs;
    }
  };
};
