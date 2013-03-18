var docRef = activeDocument;    
function saveAs(path,filename,width,height,dpi) {
    savedState = docRef.activeHistoryState
    docRef.resizeImage (width, height, dpi);
    var folder = new Folder (path);
    if (!folder.exists)
    {
         folder.create();
    }
    pngFile = new File( path + filename)
    pngSaveOptions = new PNGSaveOptions()    
    app.activeDocument.saveAs(pngFile, pngSaveOptions, true, Extension.LOWERCASE)
    docRef.activeHistoryState = savedState    
}

function main(isIcon)  {
    if (documents.length == 0) {
        alert("There are no documents open.");
        return;
    }
    try {        
            Path = app.activeDocument.path;
     }
    catch (exception) {
         docRef.saveAs(File.saveDialog ("Save image",["*.psd","*.png","*.jpg"]));
    } 
    Path = app.activeDocument.path;
    var Name = app.activeDocument.name.replace(/\.[^\.]+$/, '');     
    startRulerUnits = app.preferences.rulerUnits;
    app.preferences.rulerUnits = Units.PIXELS;    
    globSavedState = docRef.activeHistoryState;
    try {
        docRef.mergeVisibleLayers();
    }
    catch (exception) {
        alert("Please select visible layer.");
        return;
    }
    if (isIcon) {
        saveAs(Path + "/drawable-xxhdpi/" , Name + ".png",144,144,480);
        saveAs(Path + "/drawable-xhdpi/"  , Name + ".png",96,96,320);
        saveAs(Path + "/drawable-hdpi/"   ,Name + ".png",72,72,240);
        saveAs(Path + "/drawable-mdpi/"  ,Name + ".png",48,48,160);
        saveAs(Path + "/drawable-ldpi/"   ,Name + ".png",36,36,120);
    }
    else {
        var dpi = 480;
        saveAs(Path + "/drawable-xxhdpi/" , Name + ".png", docRef.width * dpi / docRef.resolution, docRef.height * dpi / docRef.resolution, dpi);
        dpi = 320;
        saveAs(Path + "/drawable-xhdpi/" , Name + ".png", docRef.width * dpi / docRef.resolution,docRef.height * dpi / docRef.resolution, dpi);
        dpi = 240;
        saveAs(Path + "/drawable-hdpi/" , Name + ".png", docRef.width * dpi / docRef.resolution ,docRef.height * dpi / docRef.resolution, dpi);
        dpi = 160;
        saveAs(Path + "/drawable-mdpi/" , Name + ".png", docRef.width * dpi / docRef.resolution,docRef.height * dpi / docRef.resolution, dpi);
        dpi = 120;
        saveAs(Path + "/drawable-ldpi/" , Name + ".png", docRef.width * dpi / docRef.resolution, docRef.height * dpi / docRef.resolution, dpi);
    }
    docRef.activeHistoryState = globSavedState;   
    app.preferences.rulerUnits = startRulerUnits;
    docRef.save();            
}