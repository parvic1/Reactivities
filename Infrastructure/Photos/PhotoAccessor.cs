using Application.Interfaces;
using Application.Photos;
using Azure;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Photos;
public class PhotoAccessor : IPhotoAccessor
{
    private readonly BlobContainerClient _containerClient;

    public PhotoAccessor(IOptions<AzureStorageSettings> config)
    {
        _containerClient = new BlobContainerClient(config.Value.ConnectionString, config.Value.ContainerName);
    }

    public async Task<PhotoUploadResult> AddPhoto(IFormFile file)
    {
        if (file.Length > 0)
        {

            await using var stream = file.OpenReadStream();

            var uniqueId = Guid.NewGuid().ToString();

            var photoUniqueFileName = $"{uniqueId}{Path.GetExtension(file.FileName)}";

            Console.WriteLine(photoUniqueFileName);


            // Get a reference to a blob named "sample-file" in a container named "sample-container"
            BlobClient blob = _containerClient.GetBlobClient(photoUniqueFileName);

            // Upload local file
            try
            {
                var uploadres = await blob.UploadAsync(stream);

                return new PhotoUploadResult
                {
                    PublicId = photoUniqueFileName,
                    Url = blob.Uri.ToString()
                };

            }
            catch(RequestFailedException ex)
            {
                throw ex;
            }         
        }

        return null;
    }

    public async Task<string> DeletePhoto(string PublicId)
    {
        try
        {
            // Get a reference to a blob named "sample-file" in a container named "sample-container"
            BlobClient blob = _containerClient.GetBlobClient(PublicId);

            await blob.DeleteIfExistsAsync(Azure.Storage.Blobs.Models.DeleteSnapshotsOption.None);

            return "OK";
        }
        catch (RequestFailedException)
        {
            return null;
        }
        

    }
}
